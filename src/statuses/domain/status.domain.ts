import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'
import { Allow, isUUID } from 'class-validator'

const idType = Number

export class Status {
  @Allow()
  @ApiProperty({
    type: idType,
  })
  id: number //number | string;

  @Allow()
  @ApiProperty({
    type: String,
    example: 'active',
  })
  name?: string
}
