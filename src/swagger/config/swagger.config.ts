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
import { SwaggerConfig } from './swagger.config.type'
import validateConfig from 'src/utils/validatate.config'
import { API_PREFIX } from 'src/shared/constants/global.constants'

class EnvironmentVariablesValidator {
  @IsString()
  @IsOptional()
  enabled: string

  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsString()
  @IsOptional()
  version: string

  @IsString()
  @IsOptional()
  path: string
}

export default registerAs<SwaggerConfig>('swagger', () => {
  validateConfig(process.env, EnvironmentVariablesValidator)

  return {
    enabled: process.env.ENABLED || 'true',
    title: process.env.TITLE || 'Nestjs Prisma Starter',
    description: process.env.DESCRIPTION || 'The nestjs API description',
    version: process.env.VERSION || '1.5',
    path: process.env.SWAGGER_PATH || `${API_PREFIX}/swagger`,
  }
})
