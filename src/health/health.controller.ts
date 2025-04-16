import { Controller, Get } from '@nestjs/common'
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  PrismaHealthIndicator
} from '@nestjs/terminus'
import { PrismaService } from 'src/database/prisma.service'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prismaHealth: PrismaHealthIndicator,
    private prisma: PrismaService,
    private memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator
  ) {}

  @Get('/prisma')
  @HealthCheck()
  prismaCheck() {
    const check = this.health.check([
      async () => this.prismaHealth.pingCheck('prisma', this.prisma)
    ])
    if (!check) return console.log('PRISMA ERROR!!!!!')
    return check
  }

  @Get('/memory')
  @HealthCheck()
  memoryCheck() {
    return this.health.check([
      async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024)
    ])
  }

  @Get('/disk')
  @HealthCheck()
  diskCheck() {
    return this.health.check([
      () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 })
    ])
  }
}
