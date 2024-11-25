import appConfig from 'src/app/config/app.config'
import authConfig from 'src/auth/config/auth.config'
import redisConfig from 'src/redis/config/redis.config'
import swaggerConfig from 'src/swagger/config/swagger.config'

export const configSetup = {
  isGlobal: true,
  load: [appConfig, redisConfig, authConfig, swaggerConfig, redisConfig],
  envFilePath: `${process.cwd()}/src/config/env/.env.${process.env.NODE_ENV}`,
}
