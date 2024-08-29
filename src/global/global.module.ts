import { MiddlewareConsumer, Module } from '@nestjs/common'
import appConfig from 'src/app/config/app.config'
import { AppModule } from 'src/app/app.module'
import { ConfigModule } from '@nestjs/config'
import swaggerConfig from 'src/swagger/config/swagger.config'
import { UserModule } from 'src/users/user.module'
import authConfig from 'src/auth/config/auth.config'
import { SessionModule } from 'src/session/session.module'
import { AuthModule } from 'src/auth/auth.module'
import { Logger, LoggerModule } from 'nestjs-pino'
import { getCorrelationId } from 'src/utils/get.correlation.id'
import { Request } from 'express'
import { AppLoggerMiddleware } from 'src/middleware/requests.log.middleware'
import pino from 'pino'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, swaggerConfig],
      envFilePath: `${process.cwd()}/src/config/env/.env.${process.env.NODE_ENV}`,
      //envFilePath: ['.env'],
    }),
    LoggerModule.forRootAsync({
      useFactory: async () => {
        return {
          pinoHttp: {
            /*prettyPrint: {
              colorize: true,
              levelFirst: true,
              translateTime: "UTC:mm/dd/yyyy, h:MM:ss TT Z"
            },*/
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
    }),
    AppModule,
    UserModule,
    SessionModule,
    AuthModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class GlobalModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*')
  }
}
