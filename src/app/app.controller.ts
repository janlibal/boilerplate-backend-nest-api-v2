import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ControllerResponseDto } from './dto/controller.resonse.dto'

@ApiTags('App')
@Controller({
  path: 'app',
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/info')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Api info successfully returned' })
  @ApiOperation({
    summary: 'Gets API Info',
    description: 'Returns API system information ',
  })
  public async getApiInfo(): Promise<ControllerResponseDto> {
    return await this.appService.compileData()
  }
}
