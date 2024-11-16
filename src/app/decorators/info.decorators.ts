import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import {
  InternalError,
  SuccessResponse,
} from 'src/swagger/all.errors.decorators'
import { infoPath } from '../constants/paths'
import { AppResponseDto } from '../dto/app.response.dto'

export function infoDecorators() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieves API system info',
      description:
        'Retrieves system information of the system the API is running on',
    }),
    SuccessResponse(
      AppResponseDto,
      'object',
      infoPath,
      HttpStatus.OK,
      'Returns user object with system information',
    ),
    InternalError(
      'Internal Server Error',
      infoPath,
      'Fatal error',
      'Server down',
    ),
  )
}
