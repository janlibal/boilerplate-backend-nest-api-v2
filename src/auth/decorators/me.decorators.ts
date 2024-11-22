import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { InternalError, SuccessResponse, UnauthorizedError,  } from 'src/swagger/all.errors.decorators'
import { mePath } from '../constants/paths'
import { User } from 'src/users/domain/user.domain'
import { unauthorizedErrors } from '../constants/errors'

export function meDecorators() {
  return applyDecorators(
    ApiOperation({
      summary: 'User profile',
      description: 'Returns brief data of the user',
    }),
    ApiBearerAuth('token'),
    SuccessResponse(
      User,
      'object',
      mePath,
      HttpStatus.OK,
      'Returns user object when logged in',
    ),
    UnauthorizedError(
      'Unauthorized Error',
      mePath,
      'Unauthorized error',
      unauthorizedErrors,
      'Unauthorized exception',
    ),
    InternalError(
      'Internal Server Error',
      mePath,
      'Internal server exception',
      'An unexpected error occurred. Please try again later.',
    ),
  )
}
