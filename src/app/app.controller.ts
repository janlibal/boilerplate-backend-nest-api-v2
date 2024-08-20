import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'

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
  public async getApiInfo() {
    const data = await this.appService.compileData()

    return data
  }
}
