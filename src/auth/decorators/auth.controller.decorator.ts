import { applyDecorators, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger'
import { LoginResponseDto } from '../dto/login.response.dto'
import { Serialize } from 'src/interceptors/serialize.decorator'
import { User } from 'src/users/domain/user.domain'
import { AccessTokenGuard } from 'src/guards/acccess.token.guard'
import { AuthGuard } from '@nestjs/passport'


export function loginDecorator() {
  return applyDecorators(
    ApiOkResponse({ type: LoginResponseDto,}),
    HttpCode(HttpStatus.OK),
    Serialize(LoginResponseDto)
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


