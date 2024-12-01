import { Type } from "class-transformer"
import { RoleEntity } from "src/roles/entities/role.entity"
import { StatusEntity } from "src/statuses/entities/status.entity"

export class UserEntity {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    provider?: string
    @Type(() => RoleEntity)
    roleId: number
    @Type(() => StatusEntity)
    statusId: number
}