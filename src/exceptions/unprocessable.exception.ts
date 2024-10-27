import { HttpException, HttpStatus } from '@nestjs/common'

export default class UnprocessableError extends HttpException {
  constructor(message: string) {
    super(
      {
        title: 'Unprocessable Error',
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        detail: message,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    )
  }
}
