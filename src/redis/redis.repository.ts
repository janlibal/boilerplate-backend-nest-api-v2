import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common'
import { Redis } from 'ioredis'
import { RedisRepositoryInterface } from './interfaces/redis.repository.interface'
import { RedisDomain } from './domain/redis.domain'

@Injectable()
export class RedisRepository
  implements OnModuleDestroy, RedisRepositoryInterface
{
  constructor(@Inject('RedisClient') private readonly redisClient: Redis) {}

  onModuleDestroy(): void {
    this.redisClient.disconnect()
  }

  async get(prefix: string, key: string | number): Promise<string | null> {
    const f = key.toLocaleString()
    return this.redisClient.get(`${prefix}:${f}`)
  }

  async del(prefix: string, key: string): Promise<number> {
    return this.redisClient.del(`${prefix}:${key}`)
  }

  async set(prefix: string, key: string, value: string): Promise<void> {
    await this.redisClient.set(`${prefix}:${key}`, value)
  }

  async delete(prefix: string, key: string | number): Promise<void> {
    await this.redisClient.del(`${prefix}:${key}`)
  }

  async setWithExpiry(
    prefix: string,
    key: string,
    value: string,
    expiry: number,
  ): Promise<void> {
    await this.redisClient.set(`${prefix}:${key}`, value, 'EX', expiry)
  }

  async setUserWithExpiry(
    prefix: string,
    key: string | number,
    value: string,
    expiry: number,
  ): Promise<void> {
    await this.redisClient.set(`${prefix}:${key}`, value, 'PX', expiry)
  }

  // NEW:
  async createUserWithExpiry(data: RedisDomain): Promise<void> {
    await this.redisClient.set(
      `${data.prefix}:${data.user.id}`,
      data.token,
      'PX',
      data.expiry,
    )
  }
}
