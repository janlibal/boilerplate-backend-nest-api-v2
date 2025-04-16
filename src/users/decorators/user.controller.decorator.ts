import { applyDecorators } from '@nestjs/common'
import { ApiCreatedResponse, ApiParam } from '@nestjs/swagger'
import { User } from '../../users/domain/user.domain'

export function createDecorator() {
  return applyDecorators(
    ApiCreatedResponse({
      type: User
    })
  )
}

export function deleteDecorator() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: String,
      required: true
    })
  )
}
