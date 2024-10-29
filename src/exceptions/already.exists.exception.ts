import { HttpException, HttpStatus } from '@nestjs/common'

export default class ResourceExistsError extends HttpException {
  constructor(resource: string) {
    super(
      {
        title: 'Conflict',
        status: HttpStatus.CONFLICT,
        detail: 'The resource already exists.',
        errors: [
          {
            message: `${resource} already exists`,
          },
        ],
      },
      HttpStatus.CONFLICT,
    )
  }
}
