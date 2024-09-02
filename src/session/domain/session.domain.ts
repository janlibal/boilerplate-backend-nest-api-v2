import { User } from '../../users/domain/user.domain'

export class Session {
  id: number
  user: User
  hash: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
