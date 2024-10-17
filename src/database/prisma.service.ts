import { INestApplication, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { Logger, PinoLogger } from 'nestjs-pino'

export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect()
    } catch (error: any) {
      process.exit(1)
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
