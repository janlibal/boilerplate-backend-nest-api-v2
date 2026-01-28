import { User } from '../../../users/domain/user.domain'
import { Status } from '../../../statuses/domain/status.domain'
import { Role } from '../../../roles/domain/role.domain'
import { UserEntity } from '../../entities/user.entity'
import { ProviderEntity as Provider } from '../../entities/provider.entity'
import { AuthProvidersEnum } from '../../../auth/auth.providers.enum'

export class UserMapper {
  static toDomain(raw: UserEntity): User {
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

  static toPersistence(data: User): Omit<UserEntity, 'id'> {
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
        return Provider.email
      case AuthProvidersEnum.facebook:
        return Provider.facebook
      case AuthProvidersEnum.google:
        return Provider.google
      case AuthProvidersEnum.twitter:
        return Provider.twitter
      case AuthProvidersEnum.apple:
        return Provider.apple
    }
  }

  private static mapProviderToDomain(provider: Provider): AuthProvidersEnum {
    switch (provider) {
      case Provider.email:
        return AuthProvidersEnum.email
      case Provider.facebook:
        return AuthProvidersEnum.facebook
      case Provider.google:
        return AuthProvidersEnum.google
      case Provider.twitter:
        return AuthProvidersEnum.twitter
      case Provider.apple:
        return AuthProvidersEnum.apple
    }
  }
}
