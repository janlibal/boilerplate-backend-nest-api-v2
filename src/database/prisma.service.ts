import { OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

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
