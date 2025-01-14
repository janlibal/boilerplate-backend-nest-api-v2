import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { UserPersistence } from '../infrastructure/persistence/user.persistence'
import { PrismaService } from '../../database/prisma.service'
import { UserMapper } from '../infrastructure/mappers/user.mapper'
import { userMockEntityObject, userMockDomainObject, userObject } from './mock/user.data'

// Mock Prisma Service
const mockPrismaService = {
  user: {
    create: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    delete: vi.fn()
  }
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

    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(userPersistence).toBeDefined()
  })

  describe('UserPersistence Operations', () => {
    it('remove()', async () => {
      
      vi.spyOn(prismaService.user, 'delete').mockResolvedValue(null)

      await userPersistence.remove(userMockDomainObject.id)

      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { id: String(userMockDomainObject.id) },
      })

      expect(prismaService.user.delete).toHaveBeenCalledTimes(1);

      
    })

    it('findById()', async () => {
      
      vi.spyOn(prismaService.user, 'findUnique').mockResolvedValue(userMockEntityObject)

      const result = await userPersistence.findById(userMockDomainObject.id)

      // Assert: Check that the result is the expected domain model
      expect(result).toEqual(userMockDomainObject)

      // Assert: Check that Prisma's `create` method was called with correct arguments
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: String(userMockDomainObject.id) },
      })
    })

    it('findByEmail()', async () => {
      
      vi.spyOn(prismaService.user, 'findFirst').mockResolvedValue(userMockEntityObject)

      const result = await userPersistence.findByEmail(userObject.email)

      // Assert: Check that the result is the expected domain model
      expect(result).toEqual(userMockDomainObject)

      // Assert: Check that Prisma's `create` method was called with correct arguments
      expect(mockPrismaService.user.findFirst).toHaveBeenCalledWith({
        where: { email: userObject.email },
      })
    })

    it('create()', async () => {
      
      const persistenceModel = await UserMapper.toPersistence(userObject)

      vi.spyOn(prismaService.user, 'create').mockResolvedValue(userMockEntityObject)

      const result = await userPersistence.create(userObject)

      // Assert: Check that the result is the expected domain model
      expect(result).toEqual(userMockDomainObject)

      // Assert: Check that Prisma's `create` method was called with correct arguments
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: persistenceModel,
      })
    })
  })
})
