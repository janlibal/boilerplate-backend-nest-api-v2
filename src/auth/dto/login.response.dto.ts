import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import { User } from 'src/users/domain/user.domain'

@ApiSchema({ name: 'Login Reponse' })
export class LoginResponseDto {
  @ApiProperty({
    description: 'Issued token',
  })
  @Expose()
  token: string

  @ApiProperty({
    description: 'Issued refresh token',
  })
  @Expose()
  refreshToken: string

  @ApiProperty({
    description: 'Token expiry date',
    default: new Date().toISOString(),
  })
  @Expose()
  tokenExpires: number

  @Expose()
  @Type(() => User)
  user: User
}
