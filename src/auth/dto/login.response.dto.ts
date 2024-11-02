import { ApiResponseProperty } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { User } from 'src/users/domain/user.domain'

export class LoginResponseDto {
  @Expose()
  token: string

  @Expose()
  refreshToken: string

  @Expose()
  tokenExpires: number

  @Expose()
  @Type(() => User)
  user: User
}
