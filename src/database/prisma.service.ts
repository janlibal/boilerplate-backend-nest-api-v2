import { INestApplication, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { Logger, PinoLogger } from 'nestjs-pino'

export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      console.log('Connecting to Postgres...')
      await this.$connect()
    } catch (error: any) {
      console.log('Could not connect to Postgress. Server terminated.')
      process.exit(1)
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
