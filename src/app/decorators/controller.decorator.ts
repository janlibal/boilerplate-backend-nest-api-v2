import { applyDecorators, Get, HttpCode, HttpStatus } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger'


export function getApiInfoDecorator() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiResponse({ status: 200, description: 'Api info successfully returned' })
  )
}



