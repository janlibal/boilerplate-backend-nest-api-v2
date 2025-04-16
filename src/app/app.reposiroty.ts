import { Injectable } from '@nestjs/common'
import * as os from 'os'
import { EnvDto } from './dto/env.dto'

@Injectable()
export class AppRepository {
  public async getEnv(): Promise<EnvDto> {
    const environments = {
      nodeVersion: process.versions['node'],
      hostName: os.hostname(),
      platform: `${process.platform}/${process.arch}`
    }
    return environments
  }
}
