import { Injectable } from '@nestjs/common'
import { NullableType } from 'src/utils/types/nullable.type'
import { User } from 'src/users/domain/user.domain'
import { Session } from 'src/session/domain/session.domain'

@Injectable()
export abstract class SessionRepository {
  abstract create(
    data: Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Session>

  abstract deleteById(id: Session['id']): Promise<void>

  abstract findById(id: Session['id']): Promise<NullableType<Session>>

  abstract deleteByUserId(conditions: { userId: User['id'] }): Promise<void>

  abstract update(
    id: Session['id'],
    payload: Partial<
      Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    >,
  ): Promise<Session | null>
}
