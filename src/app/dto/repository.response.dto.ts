import { ApiResponseProperty } from '@nestjs/swagger'

export class RepositoryResponseDto {
  @ApiResponseProperty()
  nodeVersion: string

  @ApiResponseProperty()
  hostName: string

  @ApiResponseProperty()
  platform: string
}
