import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/users/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { SessionModule } from 'src/session/session.module'
import { UserRepository } from 'src/users/user.repository'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [SessionModule, UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
