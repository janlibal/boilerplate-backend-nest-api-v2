import { HttpException, HttpStatus } from '@nestjs/common'

export default class UnauthorizedError extends HttpException {
  constructor(message: string) {
    super(
      {
        title: 'Unauthorized',
        status: HttpStatus.UNAUTHORIZED,
        detail: message,
      },
      HttpStatus.UNAUTHORIZED,
    )
  }
}
