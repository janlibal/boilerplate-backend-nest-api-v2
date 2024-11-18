import { Options } from "pino-http";

export function consoleLoggingConfig(): Options {
    return {
      messageKey: 'msg',
      transport: {
        target: 'pino-pretty',
        options: {
          singleLine: true,
          ignore:
            'req.id,req.method,req.url,req.headers,req.remoteAddress,req.remotePort,res.headers',
        },
      },
    }
}