import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common'
import BadRequestError from 'src/exceptions/bad.request.exception'

@Injectable()
export class ValidateUuidPipe implements PipeTransform<string> {
  transform(uuid: string, metadata: ArgumentMetadata) {
    if (
      !uuid.match(
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
      )
    ) {
      throw new BadRequestError(`'${uuid}' is not a UUID`)
    }
    return uuid
  }
}
