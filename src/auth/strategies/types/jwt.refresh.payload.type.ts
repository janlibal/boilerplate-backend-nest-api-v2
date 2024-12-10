import { Session } from '../../../session/domain/session.domain'
import { User } from '../../../users/domain/user.domain'

export type JwtRefreshPayloadType = {
  userId: User['id']
  sessionId: Session['id']
  hash: Session['hash']
  iat: number
  exp: number
}
