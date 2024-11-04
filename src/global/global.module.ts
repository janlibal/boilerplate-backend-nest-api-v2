import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AppModule } from 'src/app/app.module'
import { UserModule } from 'src/users/user.module'
import { SessionModule } from 'src/session/session.module'
import { AuthModule } from 'src/auth/auth.module'
import { Logger, LoggerModule } from 'nestjs-pino'
import { getCorrelationId } from 'src/utils/get.correlation.id'
import { Request } from 'express'
import { AppLoggerMiddleware } from 'src/middleware/requests.log.middleware'
import configModuleSetup from 'src/config/config.module'
import loggerModuleSetup from 'src/logger/logger.module'
import { RedisModule } from 'src/redis/redis.module'
import { PrismaModule } from 'nestjs-prisma'
import { BookModule } from 'src/book/book.module'

@Module({
  imports: [
    /*ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, swaggerConfig, redisConfig],
      envFilePath: `${process.cwd()}/src/config/env/.env.${process.env.NODE_ENV}`,
      //envFilePath: ['.env'],
    }),*/
    configModuleSetup(),
    loggerModuleSetup(),
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
    BookModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class GlobalModule {}
/*export class GlobalModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*')
  }
}*/
