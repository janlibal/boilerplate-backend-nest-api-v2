import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsNotEmpty } from 'class-validator';

@ApiSchema({name: 'Ok base response'})
export class GlobalOkResponseDto<TData> {
  @ApiProperty({
    description: 'Result of the operation',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;

  @ApiProperty({
    description: 'API path',
    example: '/api/v1',
    type: String,
  })
  path: String;

  @ApiProperty({
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

  /*@ApiProperty({
    description: 'Errors',
    example: [],
  })
  @IsArray()
  @IsNotEmpty()
  error: string;*/
}
