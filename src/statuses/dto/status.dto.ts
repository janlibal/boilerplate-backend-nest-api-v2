import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { Status } from '../domain/status.domain'

@ApiSchema({ name: 'Status Id dto' })
export class StatusDto implements Status {
  @ApiProperty()
  @IsNumber()
  id: number
}
