import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsDate, IsNotEmpty } from 'class-validator'

export class GlobalResponseDto<TData> {
  @ApiProperty({
    description: 'Result of the operation',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  success: boolean

  @ApiProperty({
    description: 'Path',
    example: '/app',
    type: String,
  })
  path: String

  /*@ApiProperty({
    description: 'Status code',
    example: 201,
    type: Number,
  })
  @IsDate()
  statusCode: Number;

  @ApiProperty({
    description: 'Timestamp',
    example: new Date().toISOString(),
    type: Date,
  })
  @IsDate()
  timestamp: String;

  @ApiProperty({
    description: 'Result',
  })
  @IsNotEmpty()
  result: TData | TData[];

  @ApiProperty({
    description: 'Errors',
    example: [],
  })
  @IsArray()
  @IsNotEmpty()
  error: string;*/
}
