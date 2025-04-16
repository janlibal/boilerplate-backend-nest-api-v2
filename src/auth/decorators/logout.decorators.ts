import { applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { logoutPath } from '../constants/paths'
import { InternalError, UnauthorizedError } from '../../swagger/all.errors.decorators'
import { unauthorizedErrors } from '../constants/errors'
import {
  internalErrorResponses,
  unauthorizedResponses
} from '../../swagger/constants/decorator.responses'

export function logoutDecorators() {
  return applyDecorators(
    ApiOperation({
      summary: 'Logs out user',
      description: 'Returns no content when logout succeeds'
    }),
    ApiBearerAuth('token'),
    ApiResponse({ status: 204, description: 'Success, returns no content' }),
    UnauthorizedError(
      unauthorizedResponses.title,
      logoutPath,
      unauthorizedResponses.detail,
      unauthorizedErrors,
      unauthorizedResponses.description
    ),
    InternalError(
      internalErrorResponses.title,
      logoutPath,
      internalErrorResponses.detail,
      internalErrorResponses.description
    )
  )
}
