import { registerAs } from '@nestjs/config'
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator'
import { AppConfig } from './app.config.type'

import { API_PREFIX } from 'src/shared/constants/global.constants'
import * as pkginfo from '../../../package.json'
import validateConfig from 'src/utils/validatate.config'
enum Environment {
  Development = 'dev',
  Production = 'prod',
  Test = 'test',
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number

  @IsUrl({ require_tld: false })
  @IsOptional()
  FRONTEND_DOMAIN: string

  @IsUrl({ require_tld: false })
  @IsOptional()
  BACKEND_DOMAIN: string

  @IsString()
  @IsOptional()
  DATABASE_URL: string

  @IsString()
  @IsOptional()
  API_PREFIX: string

  @IsString()
  @IsOptional()
  APP_FALLBACK_LANGUAGE: string

  @IsString()
  @IsOptional()
  APP_HEADER_LANGUAGE: string

  @IsString()
  @IsOptional()
  LOG_LEVEL: string

  @IsString()
  @IsOptional()
  LOG_SERVICE: string
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator)

  return {
    nodeEnv: process.env.NODE_ENV || 'dev',
    name: pkginfo.name || 'app',
    workingDirectory: process.env.PWD || process.cwd(),
    frontendDomain: process.env.FRONTEND_DOMAIN,
    backendDomain: process.env.BACKEND_DOMAIN ?? 'http://localhost',
    port: process.env.APP_PORT
      ? parseInt(process.env.APP_PORT, 10)
      : process.env.PORT
        ? parseInt(process.env.PORT, 10)
        : 3000,
    dbUrl: process.env.DATABASE_URL || 'unknown',
    apiPrefix: API_PREFIX || 'api',
    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
    headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',

    logLevel: process.env.LOG_LEVEL || 'debug',
    logService: process.env.LOG_SERVICE || 'console',
    debug: process.env.DEBUG && process.env.DEBUG == 'false',
  }
})

/*

 LOG_LEVEL=debug
LOG_SERVICE=console
DEBUG=false
  const logLevel = configService.get('app.logLevel', { infer: true }); //'debug'
  const logService = configService.get('app.logService', { infer: true }); //'console' // 
  const isDebug =  configService.get('app.debug', { infer: true }); //false 
  */
