import { User } from '../../users/domain/user.domain'
import { RedisPrefixEnum } from '../enums/redis.prefix.enum'

export class RedisDomain {
  prefix: RedisPrefixEnum
  user: User
  token: string
  expiry: number
}
