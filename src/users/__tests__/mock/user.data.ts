import { AuthProvidersEnum } from '../../../auth/auth.providers.enum'
import { User as UserDomain } from '../../domain/user.domain'
import { User as UserEntity } from '@prisma/client'

export const userObject: UserDomain = {
  firstName: 'Jan',
  lastName: 'Libal',
  email: 'jan.libal@janlibal.com',
  password: 'Password123!',
  role: { id: 1 },
  status: { id: 1 },
  provider: AuthProvidersEnum.email,
}

export const userMockDomainObject: UserDomain = {
  id: '1',
  firstName: 'Jan',
  lastName: 'Libal',
  email: 'jan.libal@janlibal.com',
  password: 'Password123!',
  role: { id: 1 },
  status: { id: 1 },
  provider: AuthProvidersEnum.email,
}

export const userMockEntityObject: UserEntity = {
  id: '1',
  firstName: 'Jan',
  lastName: 'Libal',
  email: 'jan.libal@janlibal.com',
  password: 'Password123!',
  roleId: 1,
  statusId: 1,
  provider: AuthProvidersEnum.email,
}

export const userObjectHashedPwd: UserDomain = {
  email: 'jan.libal@janlibal.com',
  password: 'hashedPassword123!',
  firstName: 'Jan',
  lastName: 'Libal',
  role: { id: 1 },
  status: { id: 1 },
  provider: AuthProvidersEnum.email,
}
