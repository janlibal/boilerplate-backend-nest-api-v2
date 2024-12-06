import { User } from "src/users/domain/user.domain"
import { Session as SessionEntity, User as UserEntity } from '@prisma/client'
import { Session } from "src/session/domain/session.domain"

export class SessionMapper {
  static async toPersistence(data: Session): Promise<SessionEntity> {
    const persistenceEntity: SessionEntity  ={
      id: data.id,
      hash: data.hash,
      userId: data.user.id, 
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    }
    return persistenceEntity
}
}
