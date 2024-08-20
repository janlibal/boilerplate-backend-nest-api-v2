import { ApiResponseProperty } from '@nestjs/swagger'
import { User } from 'src/users/domain/user.domain'

export class LoginResponseDto {
  @ApiResponseProperty()
  token: string

  @ApiResponseProperty()
  refreshToken: string

  @ApiResponseProperty()
  tokenExpires: number

  @ApiResponseProperty({
    type: () => User,
  })
  user: User
}
