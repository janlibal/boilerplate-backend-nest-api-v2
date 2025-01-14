import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { UserController } from '../user.controller'
import { UserService } from '../user.service'
import { userMockDomainObject, userObject } from './mock/user.data'

// Mock Prisma Service
const mockUserService = {
  create: vi.fn(),
}

describe('UserController', () => {
  let userController: UserController
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserController,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile()

    userController = module.get<UserController>(UserController)
    userService = module.get<UserService>(UserService)

    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(userController).toBeDefined()
  })

  describe('create()', () => {
    it('should create user', async () => {
      mockUserService.create.mockResolvedValue(userMockDomainObject)
      const result = await userController.create(userObject)
      expect(result).toEqual(userMockDomainObject)
      //expect(mockPlaylistService.createOne).toHaveBeenCalledWith({data: createPlaylist,})
    })
  })
})
