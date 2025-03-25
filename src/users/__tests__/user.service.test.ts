import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { UserService } from '../user.service'
import { UserModule } from '../user.module'
import { userMockDomainObject } from './mock/user.data'
import { UserRepository } from '../infrastructure/repository/user.repository'
import { UserPersistence } from '../infrastructure/persistence/user.persistence'
import { UserPersistenceModule } from '../infrastructure/user.infrastructure.module'
import { PrismaModule } from '../../database/prisma.module'
import { PrismaService } from '../../database/prisma.service'

// Mock Prisma Service
const mockUserPersistence = {
  findById: vi.fn(),
}

describe('UserService', () => {
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //imports: [UserModule],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserPersistence,
        },
      ],
    }).compile()

    userService = module.get<UserService>(UserService)

    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(userService).toBeDefined()
  })

  describe('UserService methods', () => {
    describe('findById()', () => {
      it('should find user by provided Id', async () => {
        mockUserPersistence.findById.mockResolvedValue(userMockDomainObject)
        const result = await userService.findById(userMockDomainObject.id)
        expect(result).toEqual(userMockDomainObject)
        expect(mockUserPersistence.findById).toHaveBeenCalledWith(
          userMockDomainObject.id,
        )
      })
    })

    /*it('findById()', async () => {
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
    })*/
  })
})
