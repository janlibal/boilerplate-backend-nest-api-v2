import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { AppModule } from 'src/app/app.module'
import { UserModule } from 'src/users/user.module'
import { SessionModule } from 'src/session/session.module'
import { AuthModule } from 'src/auth/auth.module'
import { Logger, LoggerModule } from 'nestjs-pino'
import { RedisModule } from 'src/redis/redis.module'
import { PrismaModule } from 'nestjs-prisma'
import { HealthModule } from 'src/health/health.module'
import { ConfigModule } from '@nestjs/config'
import { configSetup } from 'src/config/config.setup'
import { loggerSetuo } from 'src/logger/logger.setup'
import { AuthMiddleware } from 'src/middleware/auth-middleware'
import { RouteInfo } from '@nestjs/common/interfaces'
import { JwtModule } from '@nestjs/jwt'
import { publicRoutes } from './constants/public.routes'

@Module({
  imports: [
    JwtModule.register({ global: true }),
    ConfigModule.forRoot(configSetup),
    LoggerModule.forRootAsync(loggerSetuo),
    /*LoggerModule.forRootAsync({
      useFactory: async () => {
        return {
          pinoHttp: {
            prettyPrint: {
              colorize: true,
              levelFirst: true,
              translateTime: "UTC:mm/dd/yyyy, h:MM:ss TT Z"
            },
            transport: {
              target: 'pino-pretty',
              options: {
                singleLine: true,
              },
            },
            autoLogging: false,
            base: null,
            redact: ['req.headers.authorization'],
            serializers: {
              req: (req) => ({}),
            },
            quietReqLogger: true,
            genReqId: (request: Request) => getCorrelationId(request),
            level: 'debug',
          },
        }
      },
    }),*/
    AppModule,
    UserModule,
    SessionModule,
    AuthModule,
    PrismaModule,
    RedisModule,
    HealthModule,
  ],
  controllers: [],
  providers: [Logger],
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
        method: RequestMethod.ALL,
      })
  }
}
