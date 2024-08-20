import { Injectable } from '@nestjs/common'
import * as pkginfo from '../../package.json'
import { AppRepository } from './app.reposiroty'

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}
  public async compileData() {
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
