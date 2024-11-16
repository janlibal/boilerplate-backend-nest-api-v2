import { applyDecorators, Type } from '@nestjs/common'
import {
  ApiExtraModels,
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger'

export const ApiOk = <TModel extends Type<unknown>>(
  model: TModel,
  type: 'object',
  path: string,
  status: number,
  description?: string,
  options?: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiResponse({
      ...options,
      status: status,
      description: description,
      schema: {
        title: `ApiGlobalOkResponseOf${model.name}`,
        default: {
          status: true,
          path: path,
          statusCode: status,
          timestamp: new Date().toISOString(),
          result: {
            type: 'object',
            $ref: getSchemaPath(model),
          },
        },
      },
    }),
  )
}
