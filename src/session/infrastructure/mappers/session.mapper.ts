import { Session as SessionEntity } from '@prisma/client'
import { Session } from 'src/session/domain/session.domain'

export class SessionMapper {
    
    static async toPersistence(data: Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<SessionEntity> {

      const persistenceEntity: SessionEntity = {
        id: 0,
        hash: data.hash,
        userId: data.user.id,
        createdAt: null,
        updatedAt: null,
        deletedAt: null,
      }
      return persistenceEntity
    }  
}
