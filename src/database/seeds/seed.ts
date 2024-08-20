import { PrismaClient } from '@prisma/client'
import crypto from '../../utils/crypto'

const prisma = new PrismaClient()

async function main() {
  await prisma.role.createMany({
    data: [
      {
        role: 'admin',
      },
      {
        role: 'user',
      },
    ],
  })

  await prisma.status.createMany({
    data: [
      {
        title: 'active',
      },
      {
        title: 'inactive',
      },
    ],
  })

  await prisma.user.createMany({
    data: [
      {
        id: 'fe918fd3-96b6-4573-ab9c-3c0c15a6a91d',
        firstName: 'Joe',
        lastName: 'Doe',
        password: await crypto.hashPassword('Password123!'),
        email: 'joe.doe@joedoe.com',
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
