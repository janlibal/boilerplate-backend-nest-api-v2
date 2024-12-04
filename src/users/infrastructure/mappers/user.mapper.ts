import { User } from "src/users/domain/user.domain"
import { Status } from "src/statuses/domain/status.domain"
import { Role } from "src/roles/domain/role.domain"
import { User as UserEntity, ProviderEnum as Provider, StatusEnum as UsrStatus } from '@prisma/client'
import { AuthProvidersEnum } from "src/auth/auth.providers.enum"
import { StatusEnum } from "src/statuses/statuses.enum"

export class UserMapper {
  static async toDomain(raw: UserEntity): Promise<User> {
    let status: Status | undefined = undefined
    status = new Status()
    status = { id: Number(raw.statusId) }

    let role: Role | undefined = undefined
    role = new Role()
    role = { id: Number(raw.roleId) }

    const domainEntity: User = {
        id: raw.id,
        firstName: raw.firstName,
        lastName: raw.lastName,
        password: raw.password,
        email: raw.email,
        provider: this.mapProviderToDomain(raw.provider), 
        status: status,
        role: role   
    }
    return domainEntity
  }


  static async toPersistence(data: User): Promise<Omit<UserEntity, 'id'>> {
    const persistenceEntity: Omit<UserEntity, 'id'> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      provider: this.mapProviderToPersistence(data.provider),
      roleId: data.role.id,
      statusId: data.status.id
    }
    return persistenceEntity
  }

  private static mapProviderToPersistence(provider: AuthProvidersEnum): Provider {
      switch (provider) {
        case AuthProvidersEnum.email:
          return Provider.email;
        case AuthProvidersEnum.facebook:
          return Provider.facebook;
        case AuthProvidersEnum.google:
          return Provider.google;
        case AuthProvidersEnum.twitter:
          return Provider.twitter;
        case AuthProvidersEnum.apple:
          return Provider.apple;
      }
    }

  private static mapProviderToDomain(provider: Provider): AuthProvidersEnum {
      switch (provider) {
        case Provider.email:
          return AuthProvidersEnum.email;
        case Provider.facebook:
          return AuthProvidersEnum.facebook;
        case Provider.google:
          return AuthProvidersEnum.google;
        case Provider.twitter:
          return AuthProvidersEnum.twitter;
        case Provider.apple:
          return AuthProvidersEnum.apple;
      }
    }

    private static mapStatusToDomain(status: UsrStatus): StatusEnum {
      switch (status) {
        case UsrStatus.active:
          return StatusEnum.active
        case UsrStatus.inactive:
          return StatusEnum.inactive
      }
    }
}




  /*static toDomainOld(raw: UserEntity): User {
    const domainEntity = new User()
    domainEntity.id = raw.id
    domainEntity.email = raw.email
    domainEntity.password = raw.password
    domainEntity.provider = raw.provider
    domainEntity.firstName = raw.firstName
    domainEntity.lastName = raw.lastName
    domainEntity.role.id = raw.roleId
    domainEntity.status.id = raw.statusId
    return domainEntity
  }

  static toPersistenceOld(ddd: User): UserEntity {
    let role: RoleEntity | undefined = undefined
    if(ddd.role){
      role = new RoleEntity()
      role.id = Number(ddd.role.id)
    }

    let status: StatusEntity | undefined = undefined

    if (ddd.status) {
      status = new StatusEntity()
      status.id = Number(ddd.status.id)
    }

    const persistenceEntity = new UserEntity()
    persistenceEntity.firstName = ddd.firstName
    persistenceEntity.lastName = ddd.lastName
    persistenceEntity.email = ddd.email
    persistenceEntity.password = ddd.password
    persistenceEntity.provider = ddd.provider
    persistenceEntity.roleId = role.id
    persistenceEntity.statusId = status.id

    return persistenceEntity
  }*/
