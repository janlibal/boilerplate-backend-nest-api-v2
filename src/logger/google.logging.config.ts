import { Options } from "pino-http"
import { PinoLevelToGoogleLoggingSeverityLookup } from "./logger.factory"

export function googleLoggingConfig(): Options {
    return {
      messageKey: 'message',
      formatters: {
        level(label, number) {
          return {
            severity:
              PinoLevelToGoogleLoggingSeverityLookup[label] ||
              PinoLevelToGoogleLoggingSeverityLookup['info'],
            level: number,
          }
        },
      },
    }
  }