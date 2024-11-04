import { applyDecorators, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger'
import { LoginResponseDto } from '../dto/login.response.dto'
import { Serialize } from 'src/interceptors/serialize.decorator'
import { User } from 'src/users/domain/user.domain'
import { AccessTokenGuard } from 'src/guards/acccess.token.guard'
import { AuthGuard } from '@nestjs/passport'
import { AuthEmailLoginDto } from '../dto/auth.email.login.dto'


export function loginDecorator() {
  return applyDecorators(
    
    ApiOperation({
      summary: 'Logs in User',
      description: 'Returns user data with token, refresh token and expiration',
    }),
    ApiResponse({ 
       status:200,
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
            example: '/api/v1/auth/email/login',
          },
          statusCode: {
            type: 'number',
            example: 200,
          },
        },
      }, 
      type: LoginResponseDto
    }),
    ApiResponse({ 
      status:400,
      description: 'Returns bad request with missing email',
      schema: {
       type: 'object',
       properties: {
         status: {
           type: 'boolean',
           example: false,
         },
         path: {
           type: 'string',
           example: '/api/v1/auth/email/login',
         },
         statusCode: {
           type: 'number',
           example: 400,
         },
         title: {
          type: 'string',
          example: 'Bad Request'
         },
         detail: {
          type: 'string',
          example: 'SOmething went wrong'
         },
         errors: {
          type: 'array',
          items: {
            type: 'object',
            $ref: getSchemaPath(AuthEmailLoginDto.name)
          }
         }
       },
     }, 
   }),  
  )
}

export function registerDecorator() {
  return applyDecorators(
    HttpCode(HttpStatus.NO_CONTENT)
  )
}

export function meDecorator() {
  return applyDecorators(
  //@UseGuards(AuthGuard('jwt'))
  ApiBearerAuth(),
  UseGuards(AccessTokenGuard),
  HttpCode(HttpStatus.OK),
  Serialize(User)
  )
}

export function logoutDecorator() {
  return applyDecorators(
  ApiBearerAuth(),
  //@UseGuards(AuthGuard('jwt'))
  UseGuards(AccessTokenGuard),
  HttpCode(HttpStatus.NO_CONTENT)
  )
}

export function refreshDecorator() {
  return applyDecorators(
  ApiBearerAuth(),
  UseGuards(AuthGuard('jwt-refresh')),
  HttpCode(HttpStatus.OK)
  )
}


