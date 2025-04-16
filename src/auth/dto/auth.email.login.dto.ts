import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { Transform } from 'class-transformer'
import { lowerCaseTransformer } from '../../utils/transformers/lower.case.transformer'

@ApiSchema({ name: 'Login prerequisites' })
export class AuthEmailLoginDto {
  @ApiProperty({ example: 'joe.doe@joedoe.com', type: String })
  @Transform(lowerCaseTransformer)
  //@IsEmail({}, { message: 'Email must be valid.' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsString({ message: 'Email must be a string' })
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g, {
    message: 'Email must be in proper format'
  })
  readonly email: string

  @ApiProperty({
    example: 'Password123!',
    default: 'Password123!',
    type: String
  })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  readonly password: string
}
