import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'
import { ControllerResponseDto } from './dto/controller.resonse.dto'
import { getApiInfoDecorator } from './decorators/app.controller.decorator'

@ApiTags('App')
@Controller({
  path: 'app',
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/info')
  @getApiInfoDecorator()
  public async getApiInfo(): Promise<ControllerResponseDto> {
    return await this.appService.compileData()
  }
}
