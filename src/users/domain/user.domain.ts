import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { isUUID } from 'class-validator'
import { Role } from 'src/roles/domain/role.domain'
import { Status } from 'src/statuses/domain/status.domain'
import { v4 as uuid } from 'uuid'

export class User {
  @ApiProperty({
    type: isUUID,
  })
  @Exclude()
  id?: string //= uuid() //number | string

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
  @Expose()
  firstName: string | null

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  @Expose()
  lastName: string | null

  @ApiProperty({
    type: String,
    example: 'email',
  })
  @Expose() //({ groups: ['me', 'admin'] })
  provider: string

  @ApiProperty({
    type: () => Role,
  })
  @Expose({ name: 'roleId' })
  role?: Role | null

  @ApiProperty({
    type: () => Status,
  })
  @Expose({ name: 'statusId' })
  status?: Status
}
