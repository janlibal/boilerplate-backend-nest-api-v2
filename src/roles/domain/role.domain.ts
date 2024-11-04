import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Allow } from 'class-validator'

export class Role {
  @Allow()
  @ApiProperty({
    type: Number,
    example: 1
  })
  @Expose()
  id: number //number| string;

  @Allow()
  @ApiProperty({
    type: String,
    example: 'admin',
  })
  @Expose()
  name?: string
}
