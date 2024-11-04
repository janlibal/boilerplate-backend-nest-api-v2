import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger'
import { User } from 'src/users/domain/user.domain'


export function findOneOldDecorator() {
  return applyDecorators(
    HttpCode(HttpStatus.OK)
  )
}

export function findOneDecorator() {
  return applyDecorators(
    HttpCode(HttpStatus.OK)
  )
}

export function createDecorator() {
  return applyDecorators(
    ApiCreatedResponse({
      type: User,
    }),
    HttpCode(HttpStatus.CREATED)
  )
}

export function deleteDecorator() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      type: String,
      required: true,
    }),
    HttpCode(HttpStatus.NO_CONTENT)
  )
}

