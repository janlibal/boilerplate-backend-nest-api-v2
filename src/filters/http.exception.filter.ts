import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Request, Response } from 'express'
import { PinoLogger } from 'nestjs-pino'

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

    response.status(status).json({
      //'1. info': 'from HTTP exception filter',
      '1. timestamp': new Date().toISOString(),
      '2. path': request.url,
      '3. status': status, //exception.getResponse(),
      '4. message1': exception.message,
      //'5. error': exception.getResponse(),
      //...(exception.getResponse() as HttpErrorResponse),
    })
  }
}
