import { Options } from "pino-http";

export function cloudwatchLoggingConfig(): Options {
    // FIXME: Implement AWS CloudWatch logging configuration
    return {
      messageKey: 'message',
    }
  }