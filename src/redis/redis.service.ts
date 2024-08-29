import { Inject, Injectable } from '@nestjs/common'
import { ProductInterface } from './interfaces/product.interface'
import { RedisPrefixEnum } from './enums/redis.prefix.enum'
import { RedisRepository } from './redis.repository'
import { Session } from 'src/session/domain/session.domain'

const oneDayInSeconds = 60 * 60 * 24
const tenMinutesInSeconds = 60 * 10

@Injectable()
export class RedisService {
  constructor(
    @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
  ) {}

  async saveSession(userId: string, token: string): Promise<void> {
    // Expiry is set to 1 day
    await this.redisRepository.setUserWithExpiry(
      RedisPrefixEnum.USER,
      userId,
      token,
      900000, //15 minues
    )
  }

  async getSession(userId: string): Promise<string | null> {
    const session = await this.redisRepository.get(RedisPrefixEnum.USER, userId)
    return session //JSON.parse(product);
  }

  async releaseSession(userId: string): Promise<number> {
    const session = await this.redisRepository.del(RedisPrefixEnum.USER, userId)
    return session //JSON.parse(product);
  }

  async saveProduct(
    productId: string,
    productData: ProductInterface,
  ): Promise<void> {
    // Expiry is set to 1 day
    await this.redisRepository.setWithExpiry(
      RedisPrefixEnum.PRODUCT,
      productId,
      JSON.stringify(productData),
      oneDayInSeconds,
    )
  }

  async getProduct(productId: string): Promise<ProductInterface | null> {
    const product = await this.redisRepository.get(
      RedisPrefixEnum.PRODUCT,
      productId,
    )
    return JSON.parse(product)
  }

  async saveResetToken(userId: string, token: string): Promise<void> {
    // Expiry is set to 10 minutes
    await this.redisRepository.setWithExpiry(
      RedisPrefixEnum.RESET_TOKEN,
      token,
      userId,
      tenMinutesInSeconds,
    )
  }

  async getResetToken(token: string): Promise<string | null> {
    return await this.redisRepository.get(RedisPrefixEnum.RESET_TOKEN, token)
  }
}
