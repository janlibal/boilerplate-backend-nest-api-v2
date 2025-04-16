import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import {
  InternalError,
  SuccessResponse,
  UnauthorizedError
} from '../../swagger/all.errors.decorators'
import { mePath } from '../constants/paths'
import { User } from '../../users/domain/user.domain'
import { unauthorizedErrors } from '../constants/errors'
import {
  internalErrorResponses,
  unauthorizedResponses
} from '../../swagger/constants/decorator.responses'

export function meDecorators() {
  return applyDecorators(
    ApiOperation({
      summary: 'User profile',
      description: 'Returns brief data of the user'
    }),
    ApiBearerAuth('token'),
    SuccessResponse(User, 'object', mePath, HttpStatus.OK, 'Returns user object when logged in'),
    UnauthorizedError(
      unauthorizedResponses.title,
      mePath,
      unauthorizedResponses.detail,
      unauthorizedErrors,
      unauthorizedResponses.description
    ),
    InternalError(
      internalErrorResponses.title,
      mePath,
      internalErrorResponses.detail,
      internalErrorResponses.description
    )
  )
}
