import { UserEntity } from "src/users/infrastructure/entities/user.entity"

export class SessionEntity {
    id: number
    user: UserEntity
    hash: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }