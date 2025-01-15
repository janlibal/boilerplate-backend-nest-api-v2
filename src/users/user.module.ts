import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserPersistenceModule } from './infrastructure/user.infrastructure.module'

@Module({
  imports: [UserPersistenceModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, UserPersistenceModule],
})
export class UserModule {}
