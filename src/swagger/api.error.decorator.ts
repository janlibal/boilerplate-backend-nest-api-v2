import { applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiResponse, ApiResponseOptions, getSchemaPath } from '@nestjs/swagger'
//import { ErrorDTO } from 'src/common/dto/error.dto';

export function ApiErrorDecorator(
  statusCode: HttpStatus,
  title: string,
  path: string,
  detail: string,
  errors?: object[],
  description?: string,
  options?: ApiResponseOptions,
) {
  return applyDecorators(
    ApiResponse({
      ...options,
      status: statusCode,
      description: description,
      schema: {
        default: {
          status: false,
          path: path,
          statusCode: statusCode,
          timestamp: new Date().toISOString(),
          result: {
            title: title,
            detail: detail,
            errors: errors,
          },
        },
        //type: getSchemaPath(ErrorDTO),
      },
    }),
  )
}
