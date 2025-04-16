import { Injectable, PipeTransform } from '@nestjs/common'
import BadRequestError from '../exceptions/bad.request.exception'

@Injectable()
export class ValidateUuidPipe implements PipeTransform<string> {
  transform(uuid: string) {
    if (!uuid.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)) {
      throw new BadRequestError(`'${uuid}' is not a UUID`)
    }
    return uuid
  }
}
