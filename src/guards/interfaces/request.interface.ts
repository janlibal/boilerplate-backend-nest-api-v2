import { Request } from 'express'
import { DecodedTokenInterface } from './decoded.token.interface'

export interface IRequest extends Request {
  data: DecodedTokenInterface
}
