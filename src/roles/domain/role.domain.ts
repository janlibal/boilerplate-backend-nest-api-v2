import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'
import { Allow } from 'class-validator'

const idType = Number

export class Role {
  @Allow()
  @ApiProperty({
    type: idType,
  })
  id: number //number| string;

  @Allow()
  @ApiProperty({
    type: String,
    example: 'admin',
  })
  name?: string
}
