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
  unauthorizedErrors,
  unprocessableErrors,
} from '../constants/errors'
import {
  badRequestResponses,
  internalErrorResponses,
  unauthorizedResponses,
  unprocessableResponses,
} from 'src/swagger/constants/decorator.responses'

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
      badRequestResponses.title,
      loginPath,
      badRequestResponses.detail,
      badRequestSignInErrors,
      badRequestResponses.description,
    ),
    UnauthorizedError(
      unauthorizedResponses.title,
      loginPath,
      unauthorizedResponses.detail,
      unauthorizedErrors,
      unauthorizedResponses.description,
    ),
    UnprocessableEntityError(
      unprocessableResponses.title,
      loginPath,
      unprocessableResponses.detail,
      unprocessableErrors,
      unprocessableResponses.description,
    ),
    InternalError(
      internalErrorResponses.title,
      loginPath,
      internalErrorResponses.detail,
      internalErrorResponses.description,
    ),
  )
}
