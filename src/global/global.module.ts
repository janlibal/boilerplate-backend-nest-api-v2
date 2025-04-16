import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { AppModule } from '../app/app.module'
import { UserModule } from '../users/user.module'
import { SessionModule } from '../session/session.module'
import { AuthModule } from '../auth/auth.module'
import { Logger } from 'nestjs-pino'
import { RedisModule } from '../redis/redis.module'
import { PrismaModule } from 'nestjs-prisma'
import { HealthModule } from '../health/health.module'
import { AuthMiddleware } from '../middleware/auth-middleware'
import { RouteInfo } from '@nestjs/common/interfaces'
import { JwtModule } from '@nestjs/jwt'
import { publicRoutes } from './constants/public.routes'
import { GlobalConfigModule } from '../config/global-config.module'
import { GlobalLoggerModule } from '../logger/logger.module'

@Module({
  imports: [
    JwtModule.register({ global: true }),
    GlobalConfigModule,
    GlobalLoggerModule,
    AppModule,
    UserModule,
    SessionModule,
    AuthModule,
    PrismaModule,
    RedisModule,
    HealthModule
  ],
  controllers: [],
  providers: [Logger]
})
export class GlobalModule implements NestModule {
  public publicRoutes: Array<RouteInfo> = publicRoutes
  configure(consumer: MiddlewareConsumer) {
    // apply auth middleware to all except health check route
    consumer
      .apply(AuthMiddleware)
      .exclude(...this.publicRoutes)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL
      })
  }
}
