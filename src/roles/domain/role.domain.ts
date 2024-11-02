import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Allow } from 'class-validator'

const idType = Number

export class Role {
  @Allow()
  @ApiProperty({
    type: idType,
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
