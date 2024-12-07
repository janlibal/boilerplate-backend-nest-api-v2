import { User } from "src/users/domain/user.domain"
import { Session as SessionEntity, User as UserEntity, ProviderEnum as Provider } from '@prisma/client'
import { Session } from "src/session/domain/session.domain"
import { UserMapper } from "src/users/infrastructure/mappers/user.mapper"
import { AuthProvidersEnum } from "src/auth/auth.providers.enum"

export type NestedOmit<T, K extends PropertyKey> = {
  [P in keyof T as P extends K ? never : P]:
  NestedOmit<T[P], K extends `${Exclude<P, symbol>}.${infer R}` ? R : never>
} extends infer O ? { [P in keyof O]: O[P] } : never;

export class SessionMapper {
  static async toPersistence(data: Session): Promise<SessionEntity> {
    const persistenceEntity: SessionEntity  ={
      id: data.id,
      hash: data.hash,
      userId: data.userId, 
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    }
    return persistenceEntity
  }
  //static async toDomain(data: SessionEntity): Promise<NestedOmit<Session, "user.firstName" |"user.lastName" |"user.password" |"user.provider" |"user.email" >> {
  static async toDomain(data: SessionEntity): Promise<Session> {
    /*const user: Omit<User, 'firstName' | 'lastName' | 'password' | 'email' |'provider'> = {
      id: data.userId
    }*/
    //const domainEntity: NestedOmit<Session, "user.firstName" |"user.lastName" |"user.password" |"user.provider" |"user.email" >  ={
    const domainEntity: Session  ={
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

  private static mapUserToDomain(user: Omit<User, 'firstName' | 'lastName' | 'password' | 'email' |'provider'>): Pick<User, 'id'> {
    return  {
      id: user.id,
    }
  }
}
