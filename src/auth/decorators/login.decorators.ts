import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import {
  BadRequestError,
  InternalError,
  SuccessResponse,
  UnauthorizedError,
  UnprocessableEntityError,
} from 'src/swagger/all.errors.decorators'
import { LoginResponseDto } from '../dto/login.response.dto'
import { loginPath } from '../constants/paths'
import {
  badRequestSignInErrors,
  unprocessableErrors,
} from '../constants/errors'

export function loginDecorators() {
  return applyDecorators(
    ApiOperation({
      summary: 'Logs in User',
      description: 'Returns user data with token, refresh token and expiration',
    }),
    SuccessResponse(
      LoginResponseDto,
      'object',
      loginPath,
      HttpStatus.OK,
      'Returns user object when logged in',
    ),
    BadRequestError(
      'Bad Request',
      loginPath,
      'Something went wrong',
      badRequestSignInErrors,
      'Bad request exception',
    ),
    UnauthorizedError(
      'Unauthorized',
      loginPath,
      'Invalid email or password',
      'Unauthorized exception',
    ),
    UnprocessableEntityError(
      'Unprocessabble Error',
      loginPath,
      'Unprocessable entity error',
      unprocessableErrors,
      'Unprocessbale entity exception',
    ),
    InternalError(
      'Internal Server Error',
      loginPath,
      'Fatal error',
      'Server down',
    ),
  )
}
