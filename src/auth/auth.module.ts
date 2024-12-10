import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../users/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { SessionModule } from '../session/session.module'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [SessionModule, UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
