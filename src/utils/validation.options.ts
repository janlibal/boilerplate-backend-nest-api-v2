import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common'
import BadRequest from 'src/exceptions/bad.request.exception'

/*function generateErrors(errors: ValidationError[]) {
  return errors.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.property]:
        (currentValue.children?.length ?? 0) > 0
          ? generateErrors(currentValue.children ?? [])
          : Object.values(currentValue.constraints ?? {}).join(', '),
    }),
    {},
  )
}

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) => {
    return new UnprocessableEntityException({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      errors: generateErrors(errors),
    })
  },
}*/

const validationOptions: ValidationPipeOptions = {
  transform: true,
  exceptionFactory: (errors) => {
    const messages = errors.reduce((acc, error) => {
      if (error.constraints) {
        acc.push(...Object.values(error.constraints))
      }
      return acc
    }, [])
    return new BadRequest(messages)
  },
}
  
export default validationOptions
