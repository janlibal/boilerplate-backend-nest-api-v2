import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator'
import { Transform } from 'class-transformer'
import { lowerCaseTransformer } from 'src/utils/transformers/lower.case.transformer'

export class AuthEmailLoginDto {
  @ApiProperty({ example: 'joe.doe@joedoe.com', type: String })
  @Transform(lowerCaseTransformer)
  //@IsEmail({}, { message: 'Email must be valid.' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsString({ message: 'Email must be a string' })
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g, {
    message: 'Email must be in proper format',
  })
  readonly email: string

  @ApiProperty()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  readonly password: string
}
