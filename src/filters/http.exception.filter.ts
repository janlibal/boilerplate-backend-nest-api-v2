import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'

interface HttpErrorResponse extends HttpException {
  title: string
  detail: string
  errors: { message: string }[]
}

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpErrorResponse, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const stack = exception.stack
      ? exception.stack.split('\n')
      : exception.stack

    response.status(status).json({
      status: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      title: exception['response']['title'],
      detail: exception['response']['detail'],
      errors: exception['response']['errors'],
      stack: stack && stack.length > 2 ? `${stack[0]}  ${stack[1]}` : stack,
    })
  }
}
