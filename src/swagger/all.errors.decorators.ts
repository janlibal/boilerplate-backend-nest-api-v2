import { HttpStatus, Type } from '@nestjs/common'
import { ApiResponseOptions } from '@nestjs/swagger'
import { ApiOk } from './api.ok.decorator'
import { ApiErrorDecorator } from './api.error.decorator'

export function SuccessResponse<TModel extends Type<unknown>>(
  model: TModel,
  type: 'object',
  path: string,
  status: number,
  description?: string,
  options?: ApiResponseOptions,
) {
  return ApiOk(model, type, path, status, description, options)
}

export function BadRequestError(
  title: string,
  path: string,
  detail: string,
  errors: object[],
  description?: string,
  options?: ApiResponseOptions,
) {
  return ApiErrorDecorator(
    HttpStatus.BAD_REQUEST,
    title,
    path,
    detail,
    errors,
    description,
    options,
  )
}

export function UnauthorizedError(
  title: string,
  path: string,
  detail: string,
  description?: string,
  errors?: object[],
  options?: ApiResponseOptions,
) {
  return ApiErrorDecorator(
    HttpStatus.UNAUTHORIZED,
    title,
    path,
    detail,
    errors,
    description,
    options,
  )
}

export function InternalError(
  title: string,
  path: string,
  detail: string,
  description?: string,
  errors?: object[],
  options?: ApiResponseOptions,
) {
  return ApiErrorDecorator(
    HttpStatus.INTERNAL_SERVER_ERROR,
    title,
    path,
    detail,
    errors,
    description,
    options,
  )
}

export function UnprocessableEntityError(
  title: string,
  path: string,
  detail: string,
  errors: object[],
  description?: string,
  options?: ApiResponseOptions,
) {
  return ApiErrorDecorator(
    HttpStatus.UNPROCESSABLE_ENTITY,
    title,
    path,
    detail,
    errors,
    description,
    options,
  )
}

export function ConflictError(
  title: string,
  path: string,
  detail: string,
  errors: object[],
  description?: string,
  options?: ApiResponseOptions,
) {
  return ApiErrorDecorator(
    HttpStatus.CONFLICT,
    title,
    path,
    detail,
    errors,
    description,
    options,
  )
}
