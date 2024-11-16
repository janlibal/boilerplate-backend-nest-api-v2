import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { Role } from '../domain/role.domain'

@ApiSchema({ name: 'Role Id dto' })
export class RoleDto implements Role {
  @ApiProperty()
  @IsNumber()
  id: number
}
