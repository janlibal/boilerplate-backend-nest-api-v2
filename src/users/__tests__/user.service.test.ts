import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { UserService } from '../user.service'
import { userMockDomainObject } from './mock/user.data'
import { UserRepository } from '../infrastructure/repository/user.repository'
import { UnprocessableEntityException } from '@nestjs/common'

// Mock Prisma Service
const mockUserPersistence = {
  findById: vi.fn(),
  findByEmail: vi.fn(),
  remove: vi.fn(),
}

describe('UserService', () => {
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      it('should throw error if Id is missing', async () => {
        mockUserPersistence.findById.mockResolvedValue(null)
        try {
          await userService.findById('999') // Try with an id that doesn't exist
        } catch (error) {
          expect(error).toBeInstanceOf(UnprocessableEntityException)
        }
        expect(mockUserPersistence.findById).toHaveBeenCalledWith('999')
      })
    })
    describe('findByEmail()', () => {
      it('should find user by provided Email', async () => {
        mockUserPersistence.findByEmail.mockResolvedValue(userMockDomainObject)
        const result = await userService.findByEmail(userMockDomainObject.email)
        expect(result).toEqual(userMockDomainObject)
        expect(mockUserPersistence.findByEmail).toHaveBeenCalledWith(
          userMockDomainObject.email,
        )
      })
    })
    describe('remove()', () => {
      it('should remove user from Db with provided Id', async () => {
        mockUserPersistence.remove.mockResolvedValue(true)
        await userService.remove(userMockDomainObject.id)
        expect(mockUserPersistence.remove).toHaveBeenCalledWith(
          userMockDomainObject.id,
        )
      })
    })

    /*
    it('create()', async () => {
      mockUserPersistence.create.mockResolvedValue(userMockDomainObject)
      const result = await userPersistence.create(userObject)
      expect(result).toEqual(userMockDomainObject)
      //expect(mockUserPersistence.create).toHaveBeenCalledWith({data: userMockEntityObject,})
    })*/
  })
})
