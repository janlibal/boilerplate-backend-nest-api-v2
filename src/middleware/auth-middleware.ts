import { Injectable, NestMiddleware } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { NextFunction, Response, Request } from 'express'
import UnauthorizedError from 'src/exceptions/unauthorized.exception'
import { AllConfigType } from 'src/global/config/config.type'
import { RedisService } from 'src/redis/redis.service'



@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService,
        private redisService: RedisService,
        private configService: ConfigService<AllConfigType>,
      ) {}
    
  public async use(req: Request, _: Response, next: NextFunction) {
    
    const authorization = req.headers.authorization

    if (!authorization ||Array.isArray(authorization) || typeof authorization !== 'string'
    )
      throw new UnauthorizedError('Invalid Headers')

    const [jwt, accessToken] = authorization.split(' ')

    if (jwt !== 'jwt')
    throw new UnauthorizedError('No jwt')

    const authSecret = this.configService.getOrThrow('auth.secret', {
      infer: true,
    })

    //verify token using jwt service
    const data = await this.jwtService.verifyAsync(accessToken, {
      secret: authSecret,
    })

    const redisObject = await this.redisService.getSession(data.id)

    const isTokenFromCacheSameAsTokenFromHeaders = redisObject === accessToken

    if (!isTokenFromCacheSameAsTokenFromHeaders)
      throw new UnauthorizedError('Nice try')

    req.user = data

    next()
  }
}