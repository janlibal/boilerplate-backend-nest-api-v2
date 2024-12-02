import { User } from "src/users/domain/user.domain"
import { User as UserEntity, ProviderEnum as AuthProvider, Status } from '@prisma/client'
import { AuthProvidersEnum } from "src/auth/auth.providers.enum"
import { StatusEnum as StatusEnumFromDomain } from "src/statuses/statuses.enum"
import { Role } from "src/roles/domain/role.domain"

export class UserMapper {
  static async toDomain(raw: UserEntity): Promise<User> {
    let role: Role | undefined = undefined
    if(raw.roleId){
      role = new Role()
      role.id = Number(raw.roleId)
    }

    let status: Status | undefined = undefined

    if (raw.statusId) {
      //status = new StatusEntity()
      status.id = Number(raw.statusId)
    }

    /*let role: DomainRole
    role =  this.mapRoleToDomain(raw.roleId)*/

    
    const domainEntity: User = {
        id: raw.id,
        firstName: raw.firstName,
        lastName: raw.lastName,
        password: raw.password,
        email: raw.email,
        provider: this.mapStatusToDomain(raw.provider),//raw.provider, 
        status: status, //this.mapUserStatusToDomain(raw.statusId), //status,
        role: role
        
    }

    console.log('STATUS: ', domainEntity.status)
    console.log('ROLE ' + domainEntity.role)

    return domainEntity
  }


  static async toPersistence(data: User): Promise<UserEntity> {
    /*let role: RoleEntity | undefined = undefined
    if(data.role){
      role = new RoleEntity()
      role.id = Number(data.role.id)
    }

    let status: StatusEntity | undefined = undefined

    if (data.status) {
      //status = new StatusEntity()
      status.id = Number(data.status.id)
    }*/

    const persistenceEntity: UserEntity = {
      id: '0',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      provider: this.mapStatusToPersistence(data.provider), //provider,
      roleId: Number(data.role.id), //role.id,
      statusId: Number(data.status.id)//status.id,
    }

    return persistenceEntity
  }

  /*private static mapRoleToDomain(n: number): DomainRoleEnum {
    const admin = Object.keys(PrismaRoleEnum)[0]
    const user = Object.keys(PrismaRoleEnum)[2]

    let prismaRole: PrismaRole

    switch (n) {
      case 1:
        //prismaRole.role === 
        return DomainRoleEnum.admin
      case 2:
        return DomainRoleEnum.user
      default:
        throw new Error(`Unknown role: ${prismaRole}`);
    }
  }*/

  private static mapStatusToPersistence(status: AuthProvidersEnum): AuthProvider {
    switch (status) {
      case AuthProvidersEnum.email:
        return AuthProvider.email;
      case AuthProvidersEnum.facebook:
        return AuthProvider.facebook;
      case AuthProvidersEnum.google:
        return AuthProvider.google;
      case AuthProvidersEnum.twitter:
        return AuthProvider.twitter;
      case AuthProvidersEnum.apple:
        return AuthProvider.apple;
    }
  }

  private static mapStatusToDomain(status: AuthProvider): AuthProvidersEnum {
    switch (status) {
      case AuthProvider.email:
        return AuthProvidersEnum.email;
      case AuthProvider.facebook:
        return AuthProvidersEnum.facebook;
      case AuthProvider.google:
        return AuthProvidersEnum.google;
      case AuthProvider.twitter:
        return AuthProvidersEnum.twitter;
      case AuthProvider.apple:
        return AuthProvidersEnum.apple;
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

