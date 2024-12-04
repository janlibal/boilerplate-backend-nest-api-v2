/*import { User } from "src/users/domain/user.domain"
import { Status } from "src/statuses/domain/status.domain"
import { Role } from "src/roles/domain/role.domain"
import { Session as SessionEntity } from '@prisma/client'
import { AuthProvidersEnum } from "src/auth/auth.providers.enum"
import { StatusEnum } from "src/statuses/statuses.enum"
import { Session } from "src/session/domain/session.domain"

export type NestedOmit<T, K extends PropertyKey> = {
  [P in keyof T as P extends K ? never : P]:
  NestedOmit<T[P], K extends `${Exclude<P, symbol>}.${infer R}` ? R : never>
}

export class SessionMapper {

  static async toDomain(raw: SessionEntity): Promise<NestedOmit<Session, "user.firstName" | 'user.email' | 'user.lastName' | 'user.password' | 'user.provider'>> {
    let user: Omit<User, 'firstName' | 'lastName' | 'email' | 'password' | 'provider'> | undefined = undefined
    //user = new User()
    user = { id: String(raw.userId) }

    
    //let s: StripKey<"user.firstName" | "user.lastName" | "user.password" | "user.provider" | "user.statusId", "user.roleId">
    //Pick<Session['user'], 'id'>
    const domainEntity: NestedOmit<Session, "user.firstName" | 'user.email' | 'user.lastName' | 'user.password' | 'user.provider'> =  {
        id: raw.id,
        user: {id: raw.userId},
        hash: raw.hash,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt
    }
    return domainEntity
  }


  static async toPersistence(data: NestedOmit<Session, "user.firstName" | 'user.email' | 'user.lastName' | 'user.password' | 'user.provider'>): Promise<SessionEntity> {
    const persistenceEntity: Omit<SessionEntity, 'id'> = {
      hash: data.hash,
      userId: data.user.id,
      createdAt: data.createdAt,
      deletedAt: data.deletedAt,
      updatedAt: data.updatedAt

    }
    return persistenceEntity
  }

  
}*/
