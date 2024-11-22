import { applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { logoutPath } from '../constants/paths'
import { InternalError } from 'src/swagger/all.errors.decorators'

export function logoutDecorators() {
  return applyDecorators(
    ApiOperation({
      summary: 'Logs out user',
      description: 'Returns no content when logout succeeds',
    }),
    ApiBearerAuth('token'),
    ApiResponse({ status: 204, description: 'Success, returns no content' }),
    InternalError(
      'Internal Server Error',
      logoutPath,
      'Internal server exception',
      'An unexpected error occurred. Please try again later.',
    ),
  )
}
