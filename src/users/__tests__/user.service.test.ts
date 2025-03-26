import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { UserService } from '../user.service'
import {
  userMockDomainObject,
  userObject,
  userObjectHashedPwd,
} from './mock/user.data'
import { UserRepository } from '../infrastructure/repository/user.repository'
import { UnprocessableEntityException } from '@nestjs/common'
import ResourceExistsError from '../../exceptions/already.exists.exception'
import hashPassword from '../../utils/crypto'

// Mock Prisma Service
const mockUserPersistence = {
  findById: vi.fn(),
  findByEmail: vi.fn(),
  remove: vi.fn(),
  create: vi.fn(),
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
    describe('create()', () => {
      it('should return data for new user', async () => {
        mockUserPersistence.findByEmail.mockResolvedValue(null)

        const hashPasswordSpy = vi
          .spyOn(hashPassword, 'hashPassword')
          .mockResolvedValue('hashedPassword123!')

        mockUserPersistence.create.mockResolvedValue(userMockDomainObject)

        const result = await userService.create(userObject)

        expect(mockUserPersistence.create).toHaveBeenCalledWith(
          expect.objectContaining(userObjectHashedPwd),
        )

        expect(result).toEqual(userMockDomainObject)

        expect(hashPasswordSpy).toHaveBeenCalled()

        expect(mockUserPersistence.findByEmail).toHaveBeenCalledWith(
          userObject.email,
        )
      })
      it('should throw ConflictException if user with email already exists', async () => {
        mockUserPersistence.findByEmail.mockResolvedValue({})
        await expect(userService.create(userObject)).rejects.toThrowError(
          ResourceExistsError,
        )
      })
      it('should throw UnprocessableEntityException if role does not exist', async () => {
        mockUserPersistence.findByEmail.mockResolvedValue(null)
        await expect(
          userService.create({ ...userObject, role: { id: 999 } }),
        ).rejects.toThrowError(UnprocessableEntityException)
      })
      it('should throw UnprocessableEntityException if status does not exist', async () => {
        mockUserPersistence.findByEmail.mockResolvedValue(null)

        await expect(
          userService.create({ ...userObject, status: { id: 999 } }),
        ).rejects.toThrowError(UnprocessableEntityException)
      })
    })
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
  })
})
