import { HttpException, HttpStatus } from '@nestjs/common'

export default class BadRequestError extends HttpException {
  constructor(messages: string | string[]) {
    if (typeof messages === 'string') {
      messages = [messages]
    }
    super(
      {
        title: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
        detail: 'Something went wrong.',
        errors: messages.map((message) => ({ message })),
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}
