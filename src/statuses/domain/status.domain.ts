import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Allow, isUUID } from 'class-validator'

export class Status {
  @Allow()
  @ApiProperty({
    type: Number,
    example: 1
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
