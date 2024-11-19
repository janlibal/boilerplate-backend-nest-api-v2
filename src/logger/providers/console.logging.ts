import { Options } from "pino-http";

export function consoleLoggingConfig(): Options {
    return {
      messageKey: 'msg',
      transport: {
        targets: [
          {
            target: 'pino-pretty',
            level: 'debug',
            options: {
              singleLine: true,
              colorize: true,
              ignore: 'req.id,req.method,req.url,req.headers,req.remoteAddress,req.remotePort',
            },
          },
          {
            target: 'pino/file',
            level: 'debug',
            options: {
              destination: './logs/app.log',
              mkdir: true,
            },
          },
          {
            target: 'pino/file',
            level: 'error',
            options: {
              destination: './logs/app-error.log',
              mkdir: true,
            },
          },
        ],
      },
    }
}