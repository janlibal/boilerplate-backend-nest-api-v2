import { PrismaClient } from '@prisma/client'
import crypto from '../../src/utils/crypto'

const prisma = new PrismaClient()

async function main() {
  const role = await prisma.role.findFirst()
  if(!role) {
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
  }

  const status = await prisma.status.findFirst()
  if(!status) {
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
  }

  const user = await prisma.user.findFirst()
  if(!user) {
    const data = await prisma.user.create({
      data: 
        {
          //id: 'fe918fd3-96b6-4573-ab9c-3c0c15a6a91d',
          firstName: 'Joe',
          lastName: 'Doe',
          password: await crypto.hashPassword('Password123!'),
          email: 'joe.doe@joedoe.com',
        }
    })
    console.log('finished seeding user')
    console.log(data.id)
    console.log(data.email)
    console.log(data.password)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
