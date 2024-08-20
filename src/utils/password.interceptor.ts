import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { tap } from 'rxjs'
import { sanitize } from './sanitizer'

@Injectable()
export class PasswordSanitizerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(tap((data) => sanitize(data, 'password')))
  }
}
