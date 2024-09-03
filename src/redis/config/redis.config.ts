import { registerAs } from '@nestjs/config'

import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator'

import validateConfig from 'src/utils/validatate.config'

import { RedisConfig } from './redis.config.type'

class EnvironmentVariablesValidator {
  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  REDIS_PORT: number

  @IsUrl()
  @IsOptional()
  REDIS_HOST: string

  @IsString()
  @IsOptional()
  REDIS_USERNAME: string

  @IsString()
  @IsOptional()
  REDIS_PASSWORD: string

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  REDIS_DB: number

  //REDIS_PORT=+6379
  //REDIS_HOST=127.0.0.1
  //REDIS_USERNAME=default
  //REDIS_PASSWORD=root
  //REDIS_DB=1

  //redisUrl: string
  //username: string
  //password: string
  //port: number
  //dbNumber: number
}

export default registerAs<RedisConfig>('redis', () => {
  validateConfig(process.env, EnvironmentVariablesValidator)

  return {
    redisUrl: process.env.REDIS_HOST,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_password,
    dbNumber: process.env.REDIS_DB
      ? parseInt(process.env.REDIS_DB, 10)
      : process.env.REDIS_DB
        ? parseInt(process.env.REDIS_DB, 10)
        : 1,
    port: process.env.REDIS_PORT
      ? parseInt(process.env.REDIS_PORT, 10)
      : process.env.REDIS_PORT
        ? parseInt(process.env.REDIS_PORT, 10)
        : +6379,
    //dbNumber: process.env.REDIS_DB,
  }
})
