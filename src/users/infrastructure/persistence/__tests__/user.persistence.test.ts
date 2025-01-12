import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { UserPersistence } from '../user.persistence'
import { PrismaService } from '../../../../database/prisma.service'
import { AuthProvidersEnum } from 'src/auth/auth.providers.enum'
import { mockDomainEntity, mockPersistenceEntity, mockUser } from './mock/user.data'
import { User as UserEntity } from '@prisma/client'

// Mock Prisma Service
const mockPrismaService = {
  user: {
    create: vi.fn(),
    findUnique: vi.fn(),
  },
}

describe('UserPersistence', () => {
  let userPersistence: UserPersistence
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPersistence,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile()

    userPersistence = module.get<UserPersistence>(UserPersistence)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(userPersistence).toBeDefined()
  })

})
