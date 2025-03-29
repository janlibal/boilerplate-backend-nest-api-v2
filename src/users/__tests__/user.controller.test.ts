import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { UserController } from '../user.controller'
import { UserService } from '../user.service'
import { userMockDomainObject, userObject } from './mock/user.data'

const mockUserService = {
  create: vi.fn(),
}

describe('UserController', () => {
  let userController: UserController

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
      expect(mockUserService.create).toHaveBeenCalledWith(userObject)
    })
  })
})
