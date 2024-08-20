import {
  HttpStatus,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common'

@Injectable()
export class ValidateStringPipe {
  transform(value: string): number {
    const num = parseInt(value)
    if (!Number.isInteger(num)) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          error: `'${value}' is not a valid id. Id must be an integer.`,
        },
      })
    }
    return num
  }
}
