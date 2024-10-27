import { Injectable, PipeTransform } from '@nestjs/common'
import BadRequestError from 'src/exceptions/bad.request.exception'

@Injectable()
export class ValidateIdPipe implements PipeTransform<string> {
  transform(value: any): number {
    const num = parseInt(value)
    if (!Number.isInteger(num)) {
      throw new BadRequestError('Id is not an integer')
    }
    return num
  }
}
