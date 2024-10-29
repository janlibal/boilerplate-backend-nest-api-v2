import {
  HttpStatus,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common'
import ms from 'ms'

import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util'
import { JwtService } from '@nestjs/jwt'
import crypto from 'src/utils/crypto'
//import * as crypto from 'crypto'
//import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import { UserService } from 'src/users/user.service'
import { UserRepository } from 'src/users/user.repository'
import { AllConfigType } from 'src/global/config/config.type'
import { AuthEmailLoginDto } from './dto/auth.email.login.dto'
import { LoginResponseDto } from './dto/login.response.dto'
import { AuthProvidersEnum } from './auth.providers.enum'
import { User } from 'src/users/domain/user.domain'
import { SessionService } from 'src/session/session.service'
import { Session } from 'src/session/domain/session.domain'
import { RoleEnum } from 'src/roles/roles.enum'
import { AuthRegisterLoginDto } from './dto/auth.register.login.dto'
import { JwtRefreshPayloadType } from './strategies/types/jwt.refresh.payload.type'
import { JwtPayloadType } from './strategies/types/jwt.payload.type'
import { NullableType } from 'src/utils/types/nullable.type'
import { StatusEnum } from 'src/statuses/statuses.enum'
import { RedisService } from 'src/redis/redis.service'
import { RedisPrefixEnum } from 'src/redis/enums/redis.prefix.enum'
import UnprocessableError from 'src/exceptions/unprocessable.exception'
import UnauthorizedError from 'src/exceptions/unauthorized.exception'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private sessionService: SessionService,
    private redisService: RedisService,
    private readonly userRepository: UserRepository,
    private configService: ConfigService<AllConfigType>,
  ) {}

  async validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByEmail(loginDto.email)

    if (!user) {
      throw new UnauthorizedError('Invalid email or password')
    }

    if (user.provider !== AuthProvidersEnum.email) {
      throw new UnprocessableError(`hasToLoginViaProvider:${user.provider}`)
    }

    if (!user.password) {
      throw new UnprocessableError('missingPassword')
    }

    const isValidPassword = await crypto.comparePasswords(
      loginDto.password,
      user.password,
    )

    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid email or password')
    }

    const hash = crypto.makeHash()
    /*const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex')*/

    const session = await this.sessionService.create({ user, hash })

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: user.role,
      sessionId: session.id,
      hash,
    })

    const prefix = RedisPrefixEnum.USER
    const expiry = this.configService.getOrThrow('redis.expiry', {
      infer: true,
    })

    await this.redisService.createSession({ prefix, user, token, expiry })
    //await this.redisService.saveSession(user.id, token)

    return {
      refreshToken,
      token,
      tokenExpires,
      user,
    }
  }

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const user = await this.userService.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: dto.password,
      email: dto.email,
      role: {
        id: RoleEnum.user,
      },
      status: {
        id: StatusEnum.inactive,
      },
    })

    const hash = await this.jwtService.signAsync(
      {
        confirmEmailUserId: user.id,
      },
      {
        secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
          infer: true,
        }),
        expiresIn: this.configService.getOrThrow('auth.confirmEmailExpires', {
          infer: true,
        }),
      },
    )
  }

  async me(userJwtPayload: JwtPayloadType): Promise<NullableType<User>> {
    return this.userService.findById(userJwtPayload.id)
  }

  async logout(data: Pick<JwtRefreshPayloadType, 'sessionId' | 'userId'>) {
    //await this.redisService.releaseSession(data.userId.toString())
    await this.redisService.releaseByUserId(data)
    return this.sessionService.deleteById(data.sessionId)
  }

  async refreshToken(
    data: Pick<JwtRefreshPayloadType, 'sessionId' | 'hash'>,
  ): Promise<Omit<LoginResponseDto, 'user'>> {
    const session = await this.sessionService.findById(data.sessionId)

    if (!session) {
      throw new UnauthorizedException()
    }

    if (session.hash !== data.hash) {
      throw new UnauthorizedException()
    }

    const hash = crypto.makeHash()
    /*const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');*/

    const user = await this.userService.findById(session.user.id)

    if (!user?.role) {
      throw new UnauthorizedException()
    }

    await this.sessionService.update(session.id, {
      hash,
    })

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: session.user.id,
      role: {
        id: user.role.id,
      },
      sessionId: session.id,
      hash,
    })

    return {
      token,
      refreshToken,
      tokenExpires,
    }
  }

  private async getTokensData(data: {
    id: User['id']
    role: User['role']
    sessionId: Session['id']
    hash: Session['hash']
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    })

    const tokenExpires = Date.now() + ms(tokenExpiresIn)

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
          hash: data.hash,
        },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ])

    return {
      token,
      refreshToken,
      tokenExpires,
    }
  }
}
