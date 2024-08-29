import { Module } from '@nestjs/common'
import { SessionService } from './session.service'
import { SessionRepository } from './session.repository'
import { PrismaModule } from 'src/database/prisma.module'
import { RedisModule } from 'src/redis/redis.module'

@Module({
  imports: [PrismaModule, RedisModule],
  providers: [SessionService, SessionRepository],
  exports: [SessionService],
})
export class SessionModule {}
