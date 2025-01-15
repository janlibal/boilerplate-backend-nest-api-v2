import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { UserPersistence } from '../infrastructure/persistence/user.persistence'
import { UserService } from '../user.service'
import { UserPersistenceModule } from '../infrastructure/user.infrastructure.module'
import { PrismaService } from '../../database/prisma.service'
import { UserModule } from '../user.module'
import { PrismaModule } from '../../database/prisma.module'
import { User as UserEntity } from '@prisma/client'
import { User as UserDomain } from '../domain/user.domain'
import { AuthProvidersEnum } from '../../auth/auth.providers.enum'
import {
  userMockDomainObject,
  userMockEntityObject,
  userObject,
} from './mock/user.data'
import exp from 'constants'
import { HttpStatus, UnprocessableEntityException } from '@nestjs/common'

// Mock Prisma Service
const mockUserPersistence = {
  create: vi.fn(),
  findByEmail: vi.fn(),
  findById: vi.fn(),
}

describe('UserService', () => {
  let userService: UserService
  let userPersistence: UserPersistence

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, UserPersistenceModule, PrismaModule],
      providers: [
        UserService,
        {
          provide: UserPersistence,
          useValue: mockUserPersistence,
        },
        PrismaService,
      ],
    }).compile()

    userService = module.get<UserService>(UserService)
    userPersistence = module.get<UserPersistence>(UserPersistence)

    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(userService).toBeDefined()
  })

  describe('UserService Operations', () => {
    it('findById()', async () => {
      mockUserPersistence.findByEmail.mockResolvedValue(userMockDomainObject)
      const result = await userPersistence.findByEmail(userMockDomainObject.id)
      expect(result).toEqual(userMockDomainObject)
      //expect(mockPlaylistRepository.save).toHaveBeenCalledWith({data: createPlaylist,})
    })
    it('findByEmail()', async () => {
      mockUserPersistence.findByEmail.mockResolvedValue(userMockDomainObject)
      const result = await userPersistence.findByEmail(
        userMockDomainObject.email,
      )
      expect(result).toEqual(userMockDomainObject)
      //expect(mockPlaylistRepository.save).toHaveBeenCalledWith({data: createPlaylist,})
    })
    it('create()', async () => {
      mockUserPersistence.create.mockResolvedValue(userMockDomainObject)
      const result = await userPersistence.create(userObject)
      expect(result).toEqual(userMockDomainObject)
      //expect(mockUserPersistence.create).toHaveBeenCalledWith({data: userMockEntityObject,})
    })
  })
})
