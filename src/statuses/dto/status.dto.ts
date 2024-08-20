import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { Status } from '../domain/status.domain'

export class StatusDto implements Status {
  @ApiProperty()
  @IsNumber()
  id: number
}
