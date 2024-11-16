import { Transform, Type } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'
import { lowerCaseTransformer } from 'src/utils/transformers/lower.case.transformer'
import { RoleDto } from 'src/roles/dto/role.dto'
import { StatusDto } from 'src/statuses/dto/status.dto'

export class CreateUserDto {
  @ApiProperty({ example: 'joe.doe@joedoe.com', type: String })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be valid.' })
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g, {
    message: 'Email must be in proper format',
  })
  readonly email: string | null

  @ApiProperty()
  @IsDefined({ message: 'Password has to be defined' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must contain at least 6 characters' })
  @MaxLength(20, { message: 'Passwword can contain 20 characters at the most' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  readonly password: string

  @ApiProperty({ example: 'Joe', type: String })
  @IsNotEmpty({ message: 'Firstname cannot be empty' })
  @IsDefined({ message: 'Firstname has to be defined' })
  @IsString({ message: 'Firstname must be a string' })
  @MinLength(1, { message: 'Firstname must be longer than 1 char' })
  readonly firstName: string | null

  @ApiProperty({ example: 'Doe', type: String })
  @IsNotEmpty({ message: 'Lastname cannot be empty' })
  @IsDefined({ message: 'Lastname has to be defined' })
  @IsString({ message: 'Lastname must be a string' })
  @MinLength(1, { message: 'Lastname must be longer than 1 char' })
  readonly lastName: string | null

  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null

  @ApiPropertyOptional({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto
}
