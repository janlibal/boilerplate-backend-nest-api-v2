import { User } from '../../users/domain/user.domain'

export class Session {
  id: number
  //user: User
  userId: string
  hash: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
