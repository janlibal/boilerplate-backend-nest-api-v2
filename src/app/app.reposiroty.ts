import { Injectable } from '@nestjs/common'
import * as os from 'os'
import { RepositoryResponseDto } from './dto/repository.response.dto'

@Injectable()
export class AppRepository {
  public async getEnv(): Promise<RepositoryResponseDto> {
    const environments = {
      nodeVersion: process.versions['node'],
      hostName: os.hostname(),
      platform: `${process.platform}/${process.arch}`,
    }
    return environments
  }
}
