import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'
import { PrismaModule } from 'src/database/prisma.module'
import { SessionModule } from 'src/session/session.module'

@Module({
  imports: [PrismaModule, SessionModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
