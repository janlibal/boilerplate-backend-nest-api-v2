import { User } from "src/users/domain/user.domain"
import { UserEntity } from "../entities/user.entity"
import { RoleEntity } from "src/roles/entities/role.entity"
import { StatusEntity } from "src/statuses/entities/status.entity"
import { Status } from "src/statuses/domain/status.domain"
import { Role } from "src/roles/domain/role.domain"

export class UserMapper {
  static async toDomain(raw: UserEntity): Promise<User> {
    let status: Status | undefined = undefined
    status = new Status()
    status.id = Number(raw.statusId)

    let role: Role | undefined = undefined
    role = new Role()
    role.id = Number(raw.roleId)

    const domainEntity: User = {
        id: raw.id,
        firstName: raw.firstName,
        lastName: raw.lastName,
        password: raw.password,
        email: raw.email,
        provider: raw.provider, 
        status: status,
        role: role
        
    }
    return domainEntity
  }


  static async toPersistence(data: User): Promise<UserEntity> {
    let role: RoleEntity | undefined = undefined
    if(data.role){
      role = new RoleEntity()
      role.id = Number(data.role.id)
    }

    let status: StatusEntity | undefined = undefined

    if (data.status) {
      status = new StatusEntity()
      status.id = Number(data.status.id)
    }

    const persistenceEntity: UserEntity = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      provider: data.provider,
      roleId: role.id,
      statusId: status.id,
    }

    return persistenceEntity
  }
}
