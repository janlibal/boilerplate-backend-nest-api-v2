import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Allow, isUUID } from 'class-validator'

const idType = Number

export class Status {
  @Allow()
  @ApiProperty({
    type: idType,
  })
  @Expose()
  id: number //number | string;

  @Allow()
  @ApiProperty({
    type: String,
    example: 'active',
  })
  @Expose()
  name?: string
}
