import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Patch,
  Delete,
  SerializeOptions,
} from '@nestjs/common'

import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { AuthUpdateDto } from './dto/auth.update.dto'
import { User } from 'src/users/domain/user.domain'
import { NullableType } from 'src/utils/types/nullable.type'
import { RefreshResponseDto } from './dto/refresh.response.dto'
import { AuthForgotPasswordDto } from './dto/auth.forgot.password.dto'
import { AuthResetPasswordDto } from './dto/auth.reset.password.dto'
import { AuthConfirmEmailDto } from './dto/auth.confirm.email.dto'
import { AuthService } from './auth.service'
import { LoginResponseDto } from './dto/login.response.dto'
import { AuthEmailLoginDto } from './dto/auth.email.login.dto'
import { AuthRegisterLoginDto } from './dto/auth.register.login.dto'
import { Session } from 'inspector'
import { AccessTokenGuard } from 'src/guards/acccess.token.guard'
import { Serialize } from 'src/interceptors/serialize.decorator'
import { loginDecorator, logoutDecorator, meDecorator, registerDecorator } from './decorators/auth.controller.decorator'

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('email/login')
  @SerializeOptions({
    groups: ['me'],
  })
  @HttpCode(HttpStatus.OK)
  @Serialize(LoginResponseDto)
  @loginDecorator()
  public login(@Body() loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    return this.authService.validateLogin(loginDto)
  }

  @Post('email/register')
  @registerDecorator()
  async register(@Body() createUserDto: AuthRegisterLoginDto): Promise<void> {
    return this.authService.register(createUserDto)
  }
  
  @Get('me')
  @SerializeOptions({
    groups: ['me'],
  })
  @meDecorator()
  public me(@Request() request): Promise<NullableType<User>> {
    return this.authService.me(request.user)
  }

  @Post('logout')
  @logoutDecorator()
  public async logout(@Request() request): Promise<void> {
    await this.authService.logout({
      sessionId: request.user.sessionId,
      userId: request.user.id,
    })
  }

  @Post('refresh')
  @SerializeOptions({
    groups: ['me'],
  })
  public refresh(@Request() request): Promise<RefreshResponseDto> {
  return this.authService.refreshToken({
    sessionId: request.user.sessionId,
    hash: request.user.hash,
  })
}

  /*@Post('email/confirm')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmEmail(
    @Body() confirmEmailDto: AuthConfirmEmailDto,
  ): Promise<void> {
    return this.authService.confirmEmail(confirmEmailDto.hash)
  }

  @Post('email/confirm/new')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmNewEmail(
    @Body() confirmEmailDto: AuthConfirmEmailDto,
  ): Promise<void> {
    return this.authService.confirmNewEmail(confirmEmailDto.hash)
  }

  @Post('forgot/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(
    @Body() forgotPasswordDto: AuthForgotPasswordDto,
  ): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto.email)
  }

  @Post('reset/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(
      resetPasswordDto.hash,
      resetPasswordDto.password,
    )
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: User,
  })
  public update(
    @Request() request,
    @Body() userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    return this.authService.update(request.user, userDto)
  }

  @ApiBearerAuth()
  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Request() request): Promise<void> {
    return this.authService.softDelete(request.user)
  }*/
}
