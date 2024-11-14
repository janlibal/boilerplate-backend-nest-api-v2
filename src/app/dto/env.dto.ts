import { ApiProperty, ApiSchema } from '@nestjs/swagger'
import { Expose } from 'class-transformer'


@ApiSchema({name: 'Env details'})
export class EnvDto {
  @ApiProperty({
    type: String,
    description: 'Runtime verion',
    example: '20.10.0',
  })
  @Expose()
  nodeVersion: string

  @ApiProperty({
    type: String,
    description: 'Machine name',
    example: 'Macbooks-Macbook.local',
  })
  @Expose()
  hostName: string

  @ApiProperty({
    type: String,
    description: 'Platform name',
    example: 'darwin/x64',
  })
  @Expose()
  platform: string
}
