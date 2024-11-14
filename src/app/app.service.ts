import { Injectable } from '@nestjs/common'
import * as pkginfo from '../../package.json'
import { AppRepository } from './app.reposiroty'
import { AppResponseDto } from './dto/app.response.dto'

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}
  public async compileData(): Promise<AppResponseDto> {
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
