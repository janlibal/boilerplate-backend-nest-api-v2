import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'
import { ControllerResponseDto } from './dto/controller.resonse.dto'

@ApiTags('App')
@Controller({
  path: 'app',
  version: '1',
})
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/info')
  @HttpCode(HttpStatus.OK)
  public async getApiInfo(): Promise<ControllerResponseDto> {
    return await this.appService.compileData()
  }
}
