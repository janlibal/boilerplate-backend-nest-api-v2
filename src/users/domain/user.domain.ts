import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { isUUID } from 'class-validator'
import { Role } from 'src/roles/domain/role.domain'
import { Status } from 'src/statuses/domain/status.domain'

export class User {
  @ApiProperty({
    type: isUUID,
  })
  id?: number | string

  @ApiProperty({
    type: String,
    example: 'joe.doe@example.com',
  })
  @Expose()
  email: string | null

  @Exclude({ toPlainOnly: true })
  password: string

  @ApiProperty({
    type: String,
    example: 'Joe',
  })
  firstName: string | null

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  lastName: string | null

  @ApiProperty({
    type: String,
    example: 'email',
  })
  @Expose({ groups: ['me', 'admin'] })
  provider: string

  @ApiProperty({
    type: () => Role,
  })
  role?: Role | null

  @ApiProperty({
    type: () => Status,
  })
  status?: Status
}
