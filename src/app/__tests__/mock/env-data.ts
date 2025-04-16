import * as os from 'os'
import * as pkginfo from '../../../../package.json'

export const mockEnv = {
  nodeVersion: process.versions['node'],
  hostName: os.hostname(),
  platform: `${process.platform}/${process.arch}`
}

export const mockEnvData = {
  name: pkginfo.name,
  version: pkginfo.version,
  description: pkginfo.description,
  env: mockEnv
}
