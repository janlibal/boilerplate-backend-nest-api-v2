import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'
import * as pck from '../../../package.json'
import { EnvDto } from './env.dto'

@ApiSchema({ name: 'App response' })
export class AppResponseDto {
  @ApiProperty({
    description: 'Project name',
    default: pck.name,
  })
  @Expose()
  name: string

  @ApiProperty({
    description: 'Project version',
    default: pck.version,
  })
  @Expose()
  version: string

  @ApiProperty({
    description: 'Project description',
    default: pck.description,
  })
  @Expose()
  description: string

  @Expose()
  @Type(() => EnvDto)
  env: EnvDto
}
