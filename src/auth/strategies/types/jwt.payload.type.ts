import { Session } from 'src/session/domain/session.domain'
import { User } from 'src/users/domain/user.domain'

export type JwtPayloadType = Pick<User, 'id'> & {
  sessionId: Session['id']
  iat: number
  exp: number
}
