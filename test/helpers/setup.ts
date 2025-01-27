import { beforeEach } from 'vitest'
import resetDb from './reset-db'

beforeEach(async () => {
  console.log('To be refactorized') //await resetDb()
})
//docker-compose down --rmi all --volumes --remove-orphans
