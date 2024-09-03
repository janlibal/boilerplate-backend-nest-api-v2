import { AppConfig } from 'src/app/config/app.config.type'
import { AuthConfig } from 'src/auth/config/auth.config.type'
import { RedisConfig } from 'src/redis/config/redis.config.type'
import { SwaggerConfig } from 'src/swagger/config/swagger.config.type'

export type AllConfigType = {
  app: AppConfig
  swagger: SwaggerConfig
  auth: AuthConfig
  redis: RedisConfig
}
