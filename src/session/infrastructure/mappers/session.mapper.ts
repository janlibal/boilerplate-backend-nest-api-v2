import { User } from "src/users/domain/user.domain"
import { Session as SessionEntity, User as UserEntity } from '@prisma/client'
import { Session } from "src/session/domain/session.domain"

export type NestedOmit<T, K extends PropertyKey> = {
  [P in keyof T as P extends K ? never : P]:
  NestedOmit<T[P], K extends `${Exclude<P, symbol>}.${infer R}` ? R : never>
}

export class SessionMapper {

  static async toPersistence(data: Session): Promise<SessionEntity> {
    const user: Pick<UserEntity, 'id'> = {id: data.user.id}// { id: data.user.id, firstName: data.user.firstName, lastName: data.user.lastName, email: data.user.lastName, provider: data.user.provider, password: data.user.password, statusId: data.user.status.id, roleId: data.user.role.id, }
    const persistenceEntity: SessionEntity = {
      hash: data.hash,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
      userId: user.id,
      id: data.id
      
    }
    return persistenceEntity
  }

  /*static async toDomain(raw: SessionEntity): Promise<Session> { //Promise<Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>  {
    const user: Pick<User, 'id'> = {id: raw.userId}
    const domainEntity: Session = {
      id: raw.id,
      hash: raw.hash,
      updatedAt: raw.updatedAt,
      createdAt: raw.createdAt,
      deletedAt: raw.deletedAt,
      user: raw.userId
    }

    return domainEntity

  }*/

}
