import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger'
import { User } from 'src/users/domain/user.domain'

export function createDecorator() {
  return applyDecorators(
    ApiCreatedResponse({
      type: User,
    })
  )
}

export function deleteDecorator() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: String,
      required: true,
    })
  )
}

