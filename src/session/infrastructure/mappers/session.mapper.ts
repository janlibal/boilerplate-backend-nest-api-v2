import { Session as SessionEntity } from '@prisma/client'
import { Session } from 'src/session/domain/session.domain'

export class SessionMapper {
  static toPersistence(data: Session): SessionEntity {
    const persistenceEntity: SessionEntity = {
      id: data.id,
      hash: data.hash,
      userId: data.userId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt
    }
    return persistenceEntity
  }

  static toDomain(data: SessionEntity): Session {
    const domainEntity: Session = {
      id: data.id,
      hash: data.hash,
      userId: data.userId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      ...data
    }
    return domainEntity
  }
}
