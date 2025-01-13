import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { UserPersistence } from '../user.persistence'
import { PrismaService } from '../../../../database/prisma.service'
import { AuthProvidersEnum } from 'src/auth/auth.providers.enum'
import { User as UserDomain } from '../../../domain/user.domain'
import { UserMapper } from '../../mappers/user.mapper'
import { userMockEntityObject, userMockObject, userObject } from './mock/user.data'

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

  it('should create new user', async () => {
    
    const persistenceModel = await UserMapper.toPersistence(userObject)

    vi.spyOn(prismaService.user, 'create').mockResolvedValue(userMockEntityObject)

    const result = await userPersistence.create(userObject)

    // Assert: Check that the result is the expected domain model
    expect(result).toEqual(userMockObject)

    // Assert: Check that Prisma's `create` method was called with correct arguments
    expect(mockPrismaService.user.create).toHaveBeenCalledWith({
      data: persistenceModel,
    })
  })
})
