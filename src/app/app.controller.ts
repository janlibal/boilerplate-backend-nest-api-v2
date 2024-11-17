import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'
import { AppResponseDto } from './dto/app.response.dto'
import { Serialize } from 'src/interceptors/serialize.decorator'
import { infoDecorators } from './decorators/info.decorators'
import { ShutdownService } from './shutdown.service'

@ApiTags('App')
@Controller({
  path: 'app',
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService, private readonly shutdownService: ShutdownService) {}

  @Get('/info')
  @HttpCode(HttpStatus.OK)
  @infoDecorators()
  @Serialize(AppResponseDto)
  public async getApiInfo(): Promise<AppResponseDto> {
    return await this.appService.compileData()
  }

  @Get('/shutdown')
  public async shutdown() {
    return await this.shutdown()
  }
}
