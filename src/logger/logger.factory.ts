import { ConfigService } from '@nestjs/config'
import { ServerResponse, IncomingMessage } from 'http'
import { Params } from 'nestjs-pino'
import { GenReqId, Options, ReqId } from 'pino-http'
import { AllConfigType } from 'src/global/config/config.type'
import { v4 as uuidv4 } from 'uuid'
import {
  customErrorMessage,
  customReceivedMessage,
  customSuccessMessage,
} from './messages'
import { loggingRedactPaths } from 'src/shared/constants/global.constants'
import { logServiceConfig } from './providers/logging.config'

const genReqId: GenReqId = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => {
  const id: ReqId = req.headers['x-request-id'] || uuidv4()
  res.setHeader('X-Request-Id', id.toString())
  return id
}

async function loggerFactory(
  configService: ConfigService<AllConfigType>,
): Promise<Params> {
  const appName = configService.getOrThrow('app.name', { infer: true })
  const logLevel = configService.getOrThrow('app.logLevel', { infer: true }) //'debug'
  const logService = configService.getOrThrow('app.logService', { infer: true }) //'console' //
  const isDebug = configService.getOrThrow('app.debug', { infer: true }) //false

  const pinoHttpOptions: Options = {
    name: appName,
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
    timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
    redact: {
      paths: loggingRedactPaths,
      remove: true, //censor: '**GDPR/CCPA COMPLIANT**',
    }, // Redact sensitive information
    ...logServiceConfig(logService),
  }

  return {
    pinoHttp: pinoHttpOptions,
  }
}

export default loggerFactory
