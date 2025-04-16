import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  SerializeOptions
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { User } from '../users/domain/user.domain'
import { NullableType } from '../utils/types/nullable.type'
import { RefreshResponseDto } from './dto/refresh.response.dto'
import { AuthService } from './auth.service'
import { LoginResponseDto } from './dto/login.response.dto'
import { AuthEmailLoginDto } from './dto/auth.email.login.dto'
import { AuthRegisterLoginDto } from './dto/auth.register.login.dto'
import { AccessTokenGuard } from '../guards/acccess.token.guard'
import { Serialize } from '../interceptors/serialize.decorator'
import { loginDecorators } from './decorators/login.decorators'
import { registerDecorators } from './decorators/register.decorators'
import { meDecorators } from './decorators/me.decorators'
import { logoutDecorators } from './decorators/logout.decorators'
import { refreshDecorators } from './decorators/refresh.decorators'

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('email/login')
  @loginDecorators()
  @SerializeOptions({
    groups: ['me']
  })
  @HttpCode(HttpStatus.OK)
  @Serialize(LoginResponseDto)
  public login(@Body() loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    return this.authService.validateLogin(loginDto)
  }

  @Post('email/register')
  @registerDecorators()
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() createUserDto: AuthRegisterLoginDto): Promise<void> {
    return this.authService.register(createUserDto)
  }

  @Get('me')
  //@UseGuards(AuthGuard('jwt'))
  //@UseGuards(AccessTokenGuard)
  @meDecorators()
  @SerializeOptions({
    groups: ['me']
  })
  @Serialize(User)
  @HttpCode(HttpStatus.OK)
  public me(@Request() request): Promise<NullableType<User>> {
    return this.authService.me(request.user)
  }

  @Post('logout')
  //@UseGuards(AuthGuard('jwt'))
  @UseGuards(AccessTokenGuard)
  @logoutDecorators()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async logout(@Request() request): Promise<void> {
    await this.authService.logout({
      sessionId: request.user.sessionId,
      userId: request.user.id
    })
  }

  @Post('refresh')
  @SerializeOptions({
    groups: ['me']
  })
  @UseGuards(AuthGuard('jwt-refresh'))
  @refreshDecorators()
  @HttpCode(HttpStatus.OK)
  public refresh(@Request() request): Promise<RefreshResponseDto> {
    return this.authService.refreshToken({
      sessionId: request.user.sessionId,
      hash: request.user.hash
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
