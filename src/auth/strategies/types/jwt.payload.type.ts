import { Session } from '../../../session/domain/session.domain'
import { User } from '../../../users/domain/user.domain'

export type JwtPayloadType = Pick<User, 'id'> & {
  sessionId: Session['id']
  iat: number
  exp: number
}
