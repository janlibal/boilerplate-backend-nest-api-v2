import { Session } from 'src/session/domain/session.domain'
import { User } from 'src/users/domain/user.domain'

export type JwtRefreshPayloadType = {
  userId: User['id']
  sessionId: Session['id']
  hash: Session['hash']
  iat: number
  exp: number
}
