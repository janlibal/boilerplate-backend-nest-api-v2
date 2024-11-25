import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import {
  BadRequestError,
  ConflictError,
  InternalError,
} from 'src/swagger/all.errors.decorators'
import { registerPath } from '../constants/paths'
import { badRequestSignUpErrors, conflictErrors } from '../constants/errors'
import {
  badRequestResponses,
  conflictResponses,
  internalErrorResponses,
} from 'src/swagger/constants/decorator.responses'

export function registerDecorators() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registers a new user',
      description: 'Returns no content when registration succeeds',
    }),
    ApiResponse({ status: 204, description: 'Success, returns no content' }),
    BadRequestError(
      badRequestResponses.title,
      registerPath,
      badRequestResponses.detail,
      badRequestSignUpErrors,
      badRequestResponses.description,
    ),
    ConflictError(
      conflictResponses.title,
      registerPath,
      conflictResponses.detail,
      conflictErrors,
      conflictResponses.description,
    ),
    InternalError(
      internalErrorResponses.title,
      registerPath,
      internalErrorResponses.detail,
      internalErrorResponses.description,
    ),
  )
}
