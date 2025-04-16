import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { AuthService } from '../auth.service'
import { JwtService } from '@nestjs/jwt'
import { AuthController } from '../auth.controller'
import { dto, loginData, mockLoginResponse, mockUser } from './mock/auth.data'
import { GlobalConfigModule } from '../../config/global-config.module'
import { RedisService } from '../../redis/redis.service'

const mockAuthService = {
  register: vi.fn(),
  validateLogin: vi.fn()
}

let mockRedisService: any

describe('AuthController', () => {
  let authController: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalConfigModule],
      providers: [
        AuthController,
        {
          provide: AuthService,
          useValue: mockAuthService
        },
        {
          provide: RedisService,
          useValue: mockRedisService
        },
        JwtService
      ]
    }).compile()

    authController = module.get<AuthController>(AuthController)

    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })

  describe('AuthController methods', () => {
    describe('register()', () => {
      it('should register new user', async () => {
        mockAuthService.register.mockResolvedValue(mockUser)
        await authController.register(dto)
        expect(mockAuthService.register).toHaveBeenCalledWith(dto)
      })
    })

    describe('login()', () => {
      it('should login a registered user', async () => {
        mockAuthService.validateLogin.mockResolvedValue(mockLoginResponse)
        const result = await authController.login(loginData)
        expect(result).toEqual(mockLoginResponse)
        expect(mockAuthService.validateLogin).toHaveBeenCalledWith(loginData)
      })
    })
  })
})
