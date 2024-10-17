import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { GlobalModule } from './global/global.module'
import { ConfigService } from '@nestjs/config'
import { AllConfigType } from './global/config/config.type'
import { API_PREFIX } from './shared/constants/global.constants'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import validationOptions from './utils/validation.options'
import { ResolvePromisesInterceptor } from './utils/serializer.interceptor'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import rateLimit from 'express-rate-limit'
import compression from 'compression'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { Logger, LoggerErrorInterceptor, PinoLogger } from 'nestjs-pino'
import { AllExceptionsFilter } from './filters/all.exceptions.filter'
import { InvalidFormExceptionFilter } from './filters/invalid.form.exception.filter'
import { PasswordSanitizerInterceptor } from './utils/password.interceptor'
import HttpExceptionFilter from './filters/http.exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(GlobalModule, {
    bufferLogs: true,
    cors: true,
  })

  const configService = app.get(ConfigService<AllConfigType>)

  app.enableShutdownHooks()

  app.setGlobalPrefix(API_PREFIX)

  app.useLogger(app.get(Logger))

  const logger = await app.resolve(PinoLogger)

  /*app.useGlobalFilters(
    new AllExceptionsFilter(app.get(HttpAdapterHost), logger),
    new InvalidFormExceptionFilter(),
  )*/

  app.useGlobalFilters(new HttpExceptionFilter())

  app.useGlobalPipes(new ValidationPipe(validationOptions))
  app.useGlobalInterceptors(
    // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
    // https://github.com/typestack/class-transformer/issues/549
    new ResolvePromisesInterceptor(),
    new LoggerErrorInterceptor(),
    new PasswordSanitizerInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  )

  app.use(helmet())

  app.use(compression())

  // protect app from brute-force attacks
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  )

  const frontEnd = configService.getOrThrow('app.frontendDomain', {
    infer: true,
  })

  app.enableCors({
    origin: '*',//frontEnd,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })

  app.use(cookieParser())

  const port = configService.getOrThrow('app.port', { infer: true })
  const db = configService.getOrThrow('app.dbUrl', { infer: true })
  const redisUrl = configService.getOrThrow('redis.redisUrl', { infer: true })
  const nodeEnv = configService.getOrThrow('app.nodeEnv', { infer: true })
  const pkgInfo = configService.getOrThrow('app.name', { infer: true })
  const apiPrefix = configService.getOrThrow('app.apiPrefix', { infer: true })

  await app.listen(port, async () =>
  logger.info(`
  Port: ${port} \n
  NodeNev: ${nodeEnv} \n
  pkgINfo: ${pkgInfo} \n
  dbUrl: ${db} \n
  redisUrl: ${redisUrl} \n
  apiPrefix: ${apiPrefix} \n
  `, 'Main')  
    //logger.info(`Server started listening on ${port} w/ db ${db}`, 'Main')  
  )
}
void bootstrap()
