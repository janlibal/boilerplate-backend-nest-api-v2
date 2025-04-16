import { Injectable, UnauthorizedException } from '@nestjs/common'
import ms from 'ms'
import { JwtService } from '@nestjs/jwt'
import crypto from '../utils/crypto'
import { ConfigService } from '@nestjs/config'
import { UserService } from '../users/user.service'
import { AllConfigType } from '../global/config/config.type'
import { AuthEmailLoginDto } from './dto/auth.email.login.dto'
import { LoginResponseDto } from './dto/login.response.dto'
import { AuthProvidersEnum } from './auth.providers.enum'
import { User } from '../users/domain/user.domain'
import { SessionService } from '../session/session.service'
import { Session } from '../session/domain/session.domain'
import { RoleEnum } from '../roles/roles.enum'
import { AuthRegisterLoginDto } from './dto/auth.register.login.dto'
import { JwtRefreshPayloadType } from './strategies/types/jwt.refresh.payload.type'
import { JwtPayloadType } from './strategies/types/jwt.payload.type'
import { NullableType } from '../utils/types/nullable.type'
import { StatusEnum } from '../statuses/statuses.enum'
import { RedisService } from '../redis/redis.service'
import { RedisPrefixEnum } from '../redis/enums/redis.prefix.enum'
import UnprocessableError from '../exceptions/unprocessable.exception'
import UnauthorizedError from '../exceptions/unauthorized.exception'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private sessionService: SessionService,
    private redisService: RedisService,
    private configService: ConfigService<AllConfigType>
  ) {}

  async validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmail(loginDto.email)

    if (!user) {
      throw new UnauthorizedError('Invalid email or password')
    }

    if (user.provider !== AuthProvidersEnum.email) {
      throw new UnprocessableError(`hasToLoginViaProvider:${user.provider}`)
    }

    if (!user.password) {
      throw new UnprocessableError('missingPassword')
    }

    const isValidPassword = await crypto.comparePasswords(loginDto.password, user.password)

    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid email or password')
    }

    const hash = crypto.makeHash()

    const userId = user.id
    const session = await this.sessionService.create({ userId, hash })

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: user.role,
      sessionId: session.id,
      hash
    })

    const prefix = RedisPrefixEnum.USER
    const expiry = this.configService.getOrThrow('redis.expiry', {
      infer: true
    })

    await this.redisService.createSession({ prefix, user, token, expiry })

    return {
      refreshToken,
      token,
      tokenExpires,
      user
    }
  }

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const user = await this.userService.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: dto.password,
      email: dto.email,
      role: {
        id: RoleEnum.user
      },
      status: {
        id: StatusEnum.inactive
      }
    })

    await this.jwtService.signAsync(
      {
        confirmEmailUserId: user.id
      },
      {
        secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
          infer: true
        }),
        expiresIn: this.configService.getOrThrow('auth.confirmEmailExpires', {
          infer: true
        })
      }
    )
  }

  async me(userJwtPayload: JwtPayloadType): Promise<NullableType<User>> {
    return this.userService.findById(userJwtPayload.id)
  }

  async logout(data: Pick<JwtRefreshPayloadType, 'sessionId' | 'userId'>) {
    await this.redisService.releaseByUserId(data)
    return this.sessionService.deleteById(data.sessionId)
  }

  async refreshToken(
    data: Pick<JwtRefreshPayloadType, 'sessionId' | 'hash'>
  ): Promise<Omit<LoginResponseDto, 'user'>> {
    const session = await this.sessionService.findById(data.sessionId)

    if (!session) {
      throw new UnauthorizedException()
    }

    if (session.hash !== data.hash) {
      throw new UnauthorizedException()
    }

    const hash = crypto.makeHash()

    const user = await this.userService.findById(session.userId)

    if (!user?.role) {
      throw new UnauthorizedException()
    }

    await this.sessionService.update(session.id, {
      hash
    })

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: session.userId,
      role: {
        id: user.role.id
      },
      sessionId: session.id,
      hash
    })

    return {
      token,
      refreshToken,
      tokenExpires
    }
  }

  private async getTokensData(data: {
    id: User['id']
    role: User['role']
    sessionId: Session['id']
    hash: Session['hash']
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true
    })

    const tokenExpires = Date.now() + ms(tokenExpiresIn)

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
          sessionId: data.sessionId
        },
        {
          secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          expiresIn: tokenExpiresIn
        }
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
          hash: data.hash
        },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true
          }),
          expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true
          })
        }
      )
    ])

    return {
      token,
      refreshToken,
      tokenExpires
    }
  }
}
