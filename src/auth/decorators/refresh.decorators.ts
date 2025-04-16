import { applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

export function refreshDecorators() {
  return applyDecorators(
    ApiOperation({
      summary: 'Issues a refres token',
      description: 'Issues a refresh token based on originally issued token'
    }),
    ApiBearerAuth()
  )
}
