import { Global, Module } from '@nestjs/common'
import { redisClientFactory } from './redis.client.factory'
import { RedisRepository } from './redis.repository'
import { RedisService } from './redis.service'

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [redisClientFactory, RedisRepository, RedisService],

  exports: [RedisService]
})
export class RedisModule {}
