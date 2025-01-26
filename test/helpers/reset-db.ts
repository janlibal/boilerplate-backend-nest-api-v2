import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async () => {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE "Session" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`,
  ])
}
