import { ApiResponseProperty } from '@nestjs/swagger'
import { RepositoryResponseDto } from './repository.response.dto'

export class ServiceResponseDto {
  @ApiResponseProperty()
  name: string

  @ApiResponseProperty()
  version: string

  @ApiResponseProperty()
  description: string

  /*@ApiResponseProperty()
  nodeVersion: string

  @ApiResponseProperty()
  hostName: string

  @ApiResponseProperty()
  platform: string*/

  @ApiResponseProperty({
    type: () => RepositoryResponseDto,
  })
  env: RepositoryResponseDto
}
