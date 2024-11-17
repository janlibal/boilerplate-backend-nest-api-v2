import { ConfigService } from '@nestjs/config'
import { type IncomingMessage, type ServerResponse } from 'http'
import { Params } from 'nestjs-pino'
import { GenReqId, Options, type ReqId } from 'pino-http'
import { AllConfigType } from 'src/global/config/config.type'
import {
  loggingRedactPaths,
  LogService,
} from 'src/shared/constants/global.constants'

import { v4 as uuidv4 } from 'uuid'
import { googleLoggingConfig } from './google.logging.config'
import { cloudwatchLoggingConfig } from './cloudwatch.logging.config'
import { consoleLoggingConfig } from './console.logging.config'

// https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
export const PinoLevelToGoogleLoggingSeverityLookup = Object.freeze({
  trace: 'DEBUG',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
  fatal: 'CRITICAL',
})

const genReqId: GenReqId = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => {
  const id: ReqId = req.headers['x-request-id'] || uuidv4()
  res.setHeader('X-Request-Id', id.toString())
  return id
}

const customSuccessMessage = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  responseTime: number,
) => {
  return `[${req.id || '*'}] "${req.method} ${req.url}" ${res.statusCode} - "${req.headers['host']}" "${req.headers['user-agent']}" - ${responseTime} ms`
}

const customReceivedMessage = (req: IncomingMessage) => {
  return `[${req.id || '*'}] "${req.method} ${req.url}"`
}

const customErrorMessage = (req, res, err) => {
  return `[${req.id || '*'}] "${req.method} ${req.url}" ${res.statusCode} - "${req.headers['host']}" "${req.headers['user-agent']}" - message: ${err.message}`
}

function logServiceConfig(logService: string): Options {
  switch (logService) {
    case LogService.GOOGLE_LOGGING:
      return googleLoggingConfig()
    case LogService.AWS_CLOUDWATCH:
      return cloudwatchLoggingConfig()
    case LogService.CONSOLE:
    default:
      return consoleLoggingConfig()
  }
}


async function loggerFactory(
  configService: ConfigService<AllConfigType>,
): Promise<Params> {
  const logLevel = configService.getOrThrow('app.logLevel', { infer: true }) //'debug'
  const logService = configService.getOrThrow('app.logService', { infer: true }) //'console' //
  const isDebug = configService.getOrThrow('app.debug', { infer: true }) //false

  /*
  const logLevel = configService.get('app.logLevel', { infer: true }); //'debug'
  const logService = configService.get('app.logService', { infer: true }); //'console' // 
  const isDebug =  configService.get('app.debug', { infer: true }); //false 
  */

  const pinoHttpOptions: Options = {
    level: logLevel,
    genReqId: isDebug ? genReqId : undefined,
    serializers: isDebug
      ? {
          req: (req) => {
            req.body = req.raw.body
            return req
          },
        }
      : undefined,
    customSuccessMessage,
    customReceivedMessage,
    customErrorMessage,
    redact: {
      paths: loggingRedactPaths,
      censor: '**GDPR/CCPA COMPLIANT**',
    }, // Redact sensitive information
    ...logServiceConfig(logService),
  }

  return {
    pinoHttp: pinoHttpOptions,
  }
}

export default loggerFactory
