import { AuthEmailLoginDto } from 'src/auth/dto/auth.email.login.dto'
import { AuthRegisterLoginDto } from '../../dto/auth.register.login.dto'
import { User as UserEntity, Session as SessionEntity } from '@prisma/client'
import { Session as SessionDomain } from '../../../session/domain/session.domain'
import { AuthProvidersEnum } from '../../auth.providers.enum'
import { RoleEnum } from '../../../roles/roles.enum'
import { StatusEnum } from '../../../statuses/statuses.enum'
import { LoginResponseDto } from 'src/auth/dto/login.response.dto'

export const dto: AuthRegisterLoginDto = {
  firstName: 'Jan',
  lastName: 'Libal',
  password: 'Password123!',
  email: 'jan.libal@janlibal.com',
}

export const newUser = {
  firstName: 'Jan',
  lastName: 'Libal',
  password: 'Password123!',
  email: 'jan.libal@janlibal.com',
  role: {
    id: RoleEnum.user,
  },
  status: {
    id: StatusEnum.inactive,
  },
}

export const loginData: AuthEmailLoginDto = {
  email: 'jan.libal@janlibal.com',
  password: 'Password123!',
}

export const mockUserGoogle: UserEntity = {
  id: 'fd4e8fb7-818d-4e1c-adba-920e13bc2d76',
  firstName: 'Jan',
  lastName: 'Libal',
  email: 'jan.libal@janlibal.com',
  password: 'Password123!',
  statusId: 1,
  roleId: 1,
  provider: AuthProvidersEnum.google,
}

export const mockUserNoPwd: UserEntity = {
  id: 'fd4e8fb7-818d-4e1c-adba-920e13bc2d76',
  firstName: 'Jan',
  lastName: 'Libal',
  email: 'jan.libal@janlibal.com',
  password: null,
  statusId: 1,
  roleId: 1,
  provider: AuthProvidersEnum.google,
}

export const mockUser: UserEntity = {
  id: 'fd4e8fb7-818d-4e1c-adba-920e13bc2d76',
  firstName: 'Jan',
  lastName: 'Libal',
  email: 'jan.libal@janlibal.com',
  password: 'Password123!',
  statusId: 1,
  roleId: 1,
  provider: AuthProvidersEnum.email,
}

export const loginDataBad: AuthEmailLoginDto = {
  email: 'jan.libal@janlibal.com',
  password: 'Pass123!',
}

export const sessionData = {
  userId: mockUser.id,
  hash: 'hash123',
}

export const mockSession: SessionEntity = {
  id: 1,
  hash: 'hash123',
  userId: mockUser.id,
  createdAt: new Date('2011-10-10T14:48:00'),
  updatedAt: new Date('2011-10-10T14:48:00'),
  deletedAt: new Date('2011-10-10T14:48:00'),
}
