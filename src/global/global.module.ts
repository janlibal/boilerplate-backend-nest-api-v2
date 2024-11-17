import { Module } from '@nestjs/common'
import { AppModule } from 'src/app/app.module'
import { UserModule } from 'src/users/user.module'
import { SessionModule } from 'src/session/session.module'
import { AuthModule } from 'src/auth/auth.module'
import { Logger, LoggerModule } from 'nestjs-pino'
import loggerModuleSetup from 'src/logger/logger.module'
import { RedisModule } from 'src/redis/redis.module'
import { PrismaModule } from 'nestjs-prisma'
import { BookModule } from 'src/book/book.module'
import { HealthModule } from 'src/health/health.module'
import { ConfigModule } from '@nestjs/config'
import { configSetup } from 'src/config/config.setup'
import { loggerSetup } from 'src/logger/logger.setup'

@Module({
  imports: [
    ConfigModule.forRoot(configSetup),
    LoggerModule.forRootAsync(loggerSetup),
    //loggerModuleSetup(),
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
    HealthModule
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
