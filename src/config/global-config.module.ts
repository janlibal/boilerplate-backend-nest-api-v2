import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import appConfig from '../app/config/app.config'
import authConfig from '../auth/config/auth.config'
import redisConfig from '../redis/config/redis.config'
import swaggerConfig from '../swagger/config/swagger.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, redisConfig, swaggerConfig],
      envFilePath: ['.env']
    })
  ],
  exports: [ConfigModule]
})
export class GlobalConfigModule {}
