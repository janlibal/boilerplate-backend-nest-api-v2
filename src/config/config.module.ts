import { ModuleMetadata } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import appConfig from 'src/app/config/app.config'
import authConfig from 'src/auth/config/auth.config'
import redisConfig from 'src/redis/config/redis.config'
import swaggerConfig from 'src/swagger/config/swagger.config'

function configModuleSetup() {
  const configModule = ConfigModule.forRoot({
    isGlobal: true,
    load: [appConfig, authConfig, swaggerConfig, redisConfig],
    envFilePath: `${process.cwd()}/src/config/env/.env.${process.env.NODE_ENV}`,
  })

  return configModule
}

export default configModuleSetup
