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

export class IdSanitizerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(tap((data) => sanitize(data, 'id')))
  }
}

export class StatusSanitizerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(tap((data) => sanitize(data, 'statusId')))
  }
}

export class RoleSanitizerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(tap((data) => sanitize(data, 'roleId')))
  }
}
