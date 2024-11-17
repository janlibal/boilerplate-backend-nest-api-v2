import { NestFactory } from '@nestjs/core'
import { GlobalModule } from './global/global.module'
import { ConfigService } from '@nestjs/config'
import { AllConfigType } from './global/config/config.type'
import { API_PREFIX } from './shared/constants/global.constants'
import { ValidationPipe } from '@nestjs/common'
import validationOptions from './utils/validation.options'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import compression from 'compression'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { Logger, LoggerErrorInterceptor, PinoLogger } from 'nestjs-pino'
import AnyExceptionFilter from './filters/any.exception.filter'
import HttpExceptionFilter from './filters/http.exception.filter'
import { ResponseInterceptor } from './interceptors/response.interceptor'
import rateLimit from 'express-rate-limit'

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

  //app.useGlobalGuards(new AuthGuard())

  app.useGlobalPipes(new ValidationPipe(validationOptions))

  app.useGlobalFilters(new AnyExceptionFilter(), new HttpExceptionFilter())

  //app.useGlobalInterceptors(new ResponseInterceptor(), new LoggerErrorInterceptor())
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new LoggerErrorInterceptor(),
  )
  /*app.useGlobalInterceptors(
    // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
    // https://github.com/typestack/class-transformer/issues/549
    new ResolvePromisesInterceptor(),
    new LoggerErrorInterceptor(),
    new PasswordSanitizerInterceptor(),
    new IdSanitizerInterceptor(),
    new StatusSanitizerInterceptor(),
    new RoleSanitizerInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  )*/

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          upgradeInsecureRequests: null,
        },
      },
    }),
  )

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
    origin: '*', //frontEnd,
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

  // Swagger Options
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nestjs Boilerplate API')
    .setDescription(
      'Nest Boilerplate API is a simple RESTful API boilerplate project built using Nest, Prisma as ORM for Postgres, Redis, TS, Docker, Swagger, Jest, Nginx.',
    )
    .setVersion('2.0')
    .setTermsOfService('http://swagger.io/terms/')
    .setContact('Jan Libal', 'github.com/janlibal', 'jan.libal@yahoo.com')
    .setLicense('Apache 2.0', 'http://www.apache.org/licenses/LICENSE-2.0.html')
    .addBearerAuth(
      {
        in: 'header',
        description: 'Please enter JWT token',
        type: 'apiKey',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
      },
      'token'
    )
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document)

  await app.listen(
    port,
    async () =>
      logger.info(
        `
  Port: ${port} \n
  NodeNev: ${nodeEnv} \n
  pkgINfo: ${pkgInfo} \n
  dbUrl: ${db} \n
  redisUrl: ${redisUrl} \n
  apiPrefix: ${apiPrefix} \n
  `,
        'Main',
      ),
    //logger.info(`Server started listening on ${port} w/ db ${db}`, 'Main')
  )
}
void bootstrap()
