import { HttpException, HttpStatus } from '@nestjs/common'

export default class NotFoundError extends HttpException {
  constructor(resource: string) {
    super(
      {
        title: 'Not Found',
        status: HttpStatus.NOT_FOUND,
        detail: 'The resource not found.',
        errors: [
          {
            message: `${resource} was not found`,
          },
        ],
      },
      HttpStatus.NOT_FOUND,
    )
  }
}
