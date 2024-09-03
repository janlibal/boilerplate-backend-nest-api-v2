import { Injectable } from '@nestjs/common'
import * as pkginfo from '../../package.json'
import { AppRepository } from './app.reposiroty'
import { ServiceResponseDto } from './dto/service.response.dto'

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}
  public async compileData(): Promise<ServiceResponseDto> {
    const env = await this.appRepository.getEnv()

    const data = {
      name: pkginfo.name,
      version: pkginfo.version,
      description: pkginfo.description,
      env,
    }

    return data
  }
}
