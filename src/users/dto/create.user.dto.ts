import { Exclude, Transform, Type } from 'class-transformer'
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
  @IsNotEmpty()
  @IsEmail()
  email: string | null

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string

  @ApiProperty({ example: 'Joe', type: String })
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  firstName: string | null

  @ApiProperty({ example: 'Doe', type: String })
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  lastName: string | null

  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null

  @ApiPropertyOptional({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto
}
