import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'
import { Transform } from 'class-transformer'
import { lowerCaseTransformer } from 'src/utils/transformers/lower.case.transformer'

export class AuthForgotPasswordDto {
  @ApiProperty({ example: 'joe.doe@joedoe.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string
}
