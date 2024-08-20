import { Module } from '@nestjs/common'
import { SessionService } from './session.service'
import { SessionRepository } from './session.repository'
import { PrismaModule } from 'src/database/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [SessionService, SessionRepository],
  exports: [SessionService],
})
export class SessionModule {}
