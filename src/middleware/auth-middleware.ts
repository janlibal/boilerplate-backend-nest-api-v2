import { Injectable, NestMiddleware } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { NextFunction, Response, Request } from 'express'
import UnauthorizedError from 'src/exceptions/unauthorized.exception'
import { AllConfigType } from 'src/global/config/config.type'
import { RedisService } from 'src/redis/redis.service'
import ms from 'ms'
import { User } from 'src/users/domain/user.domain'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private redisService: RedisService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  public async use(req: Request, _: Response, next: NextFunction) {
    const authorization = req.headers.authorization

    if (
      !authorization ||
      Array.isArray(authorization) ||
      typeof authorization !== 'string'
    )
      throw new UnauthorizedError('Invalid Headers')

    const [jwt, accessToken] = authorization.split(' ')

    if (jwt !== 'jwt') throw new UnauthorizedError('No jwt')

    if (!accessToken) throw new UnauthorizedError('No token')

    const authSecret = this.configService.getOrThrow('auth.secret', {
      infer: true,
    })

    //verify token using jwt service
    let data: User
    try {
      data = await this.jwtService.verifyAsync(accessToken, {
        secret: authSecret,
      })
    } catch (error) {
      throw new UnauthorizedError('Wrong token')
    }

    const redisObject = await this.redisService.getSession(data.id)

    const isTokenFromCacheSameAsTokenFromHeaders = redisObject === accessToken

    if (!isTokenFromCacheSameAsTokenFromHeaders)
      throw new UnauthorizedError('Nice try')

    req.user = data

    next()
  }
}
