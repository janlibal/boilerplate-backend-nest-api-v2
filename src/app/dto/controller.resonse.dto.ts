import { ApiResponseProperty } from '@nestjs/swagger'
import { ServiceResponseDto } from './service.response.dto'

export class ControllerResponseDto {
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

  /*@ApiResponseProperty({
    type: () => ServiceResponseDto,
  })
  data: ServiceResponseDto*/
}
