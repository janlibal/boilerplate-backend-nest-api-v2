import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../../database/prisma.service'
import { SessionPersistence } from './session.persistence'

describe('SessionPersistence', () => {
  let repository: SessionPersistence
  let prismaService: PrismaService

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionPersistence,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile()

    repository = module.get<SessionPersistence>(SessionPersistence)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })
})
