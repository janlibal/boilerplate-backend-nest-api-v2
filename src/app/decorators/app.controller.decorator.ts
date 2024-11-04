import { applyDecorators, Get, HttpCode, HttpStatus } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger'
import { ControllerResponseDto } from '../dto/controller.resonse.dto'


export function getApiInfoDecorator() {
  return applyDecorators(
    //ApiResponse({ status: 200, description: 'Api info successfully returned' })
    ApiOperation({
      summary: 'Gets API Info',
      description: 'Returns API system information ',
    }),
    ApiResponse({
      status: 200,
      description: 'Successful operation',
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'boolean',
            example: true,
          },
          path: {
            type: 'string',
            example: '/api/v1/app/info',
          },
          statusCode: {
            type: 'number',
            example: 200,
          },
          result: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'nest-project'
              },
              version: {
                type: 'number',
                example: 2.0,
              },
              description: {
                type: 'string',
                example: 'Nestjs-API-Project'
              },
              env: {
                type: 'object',
                properties: {
                  nodeVersion: {
                    type: 'string',
                    example: '20.18.0',
                  },
                  hostName: {
                    type: 'string',
                    example: 'Macbook-MacBook-Pro.local'
                  },
                  platform: {
                    type: 'string',
                    example: 'dawin/x64'
                  }
                }
              }
            }
          },
        },
      },
    })
  )
}
