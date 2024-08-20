import { FactoryProvider } from '@nestjs/common'
import { Redis } from 'ioredis'
import { redisStatus } from './redis.status'

export const redisClientFactory: FactoryProvider<Redis> = {
  provide: 'RedisClient',
  useFactory: () => {
    const redisInstance = new Redis({
      host: '127.0.0.1',
      password: 'root',
      username: 'default',
      db: 1,
      port: +6379,
    })

    redisInstance.on('connect', redisStatus.handleConnect.bind(this))
    redisInstance.on('ready', redisStatus.handleReady.bind(this))
    redisInstance.on('error', redisStatus.handleError.bind(this))
    redisInstance.on('close', redisStatus.handleClose.bind(this))
    redisInstance.on('reconnecting', redisStatus.handleReconnecting.bind(this))
    redisInstance.on('end', redisStatus.handleEnd.bind(this))

    return redisInstance
  },
  inject: [],
}
