import { Session as SessionDomain } from '../../domain/session.domain'
import { Session as SessionEntity } from '@prisma/client'

export const sessionObject: SessionDomain = {
  id: 1,
  hash: 'Testhash',
  userId: '1',
  createdAt: new Date('2024-12-31T00:00:00'),
  updatedAt: new Date('2024-12-31T00:00:00'),
  deletedAt: new Date('2024-12-31T00:00:00')
}

export const sessionMockEntityObject: SessionEntity = {
  id: 1,
  hash: 'Testhash',
  userId: '1',
  createdAt: new Date('2024-12-31T00:00:00'),
  updatedAt: new Date('2024-12-31T00:00:00'),
  deletedAt: new Date('2024-12-31T00:00:00')
}

export const sessionMockDomainObject: SessionDomain = {
  id: 1,
  hash: 'Testhash',
  userId: '1',
  createdAt: new Date('2024-12-31T00:00:00'),
  updatedAt: new Date('2024-12-31T00:00:00'),
  deletedAt: new Date('2024-12-31T00:00:00')
}
