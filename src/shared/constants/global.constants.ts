//eslint-disable-next-line
require('dotenv').config()

export const API_PREFIX = '/api/v1'

// Redact value of these paths from logs
export const loggingRedactPaths = [
  'req.headers.authorization',
  'req.body.token',
  'req.body.refreshToken',
  'req.body.email',
  'req.body.password',
  'req.body.oldPassword',
]

export enum LogService {
  CONSOLE = 'console',
  GOOGLE_LOGGING = 'google_logging',
  AWS_CLOUDWATCH = 'aws_cloudwatch',
}
