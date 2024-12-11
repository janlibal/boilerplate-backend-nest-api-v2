import { Test, TestingModule } from '@nestjs/testing'
import { UserPersistence } from './user.persistence'
import { PrismaService } from '../../../database/prisma.service'

describe('UserPersistence', () => {
  let repository: UserPersistence
  let prismaService: PrismaService

  const mockPrismaService = {
    user: {
      create: jest.fn(),
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPersistence,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile()

    repository = module.get<UserPersistence>(UserPersistence)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })
})
