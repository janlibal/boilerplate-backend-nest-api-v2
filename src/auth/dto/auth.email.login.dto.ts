import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'
import { lowerCaseTransformer } from 'src/utils/transformers/lower.case.transformer'

export class AuthEmailLoginDto {
  @ApiProperty({ example: 'joe.doe@joedoe.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  password: string
}
