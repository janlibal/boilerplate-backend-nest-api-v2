import { Module } from '@nestjs/common'
import { HealthController } from './health.controller'
import { TerminusModule } from '@nestjs/terminus'
import { PrismaModule } from 'src/database/prisma.module'

@Module({
  imports: [PrismaModule, TerminusModule],
  controllers: [HealthController]
})
export class HealthModule {}
