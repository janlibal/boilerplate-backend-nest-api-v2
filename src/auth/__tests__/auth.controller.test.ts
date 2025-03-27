import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { AuthService } from '../auth.service'
import { JwtService } from '@nestjs/jwt'
import { UserModule } from '../../users/user.module'
import { UserPersistenceModule } from '../../users/infrastructure/user.infrastructure.module'
import { PrismaModule } from '../../database/prisma.module'
import { SessionModule } from '../../session/session.module'
import { SessionPersistenceModule } from '../../session/infrastructure/session.infrastructure.module'
import { RedisModule } from '../../redis/redis.module'
import { AuthController } from '../auth.controller'
import { dto, loginData, mockLoginResponse, mockUser } from './mock/auth.data'
import { GlobalConfigModule } from '../../config/global-config.module'

const mockAuthService = {
  register: vi.fn(),
  validateLogin: vi.fn(),
}

describe('AuthController', () => {
  let authController: AuthController
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        UserPersistenceModule,
        SessionModule,
        SessionPersistenceModule,
        RedisModule,
        PrismaModule,
        GlobalConfigModule,
      ],
      providers: [
        AuthController,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        JwtService,
      ],
    }).compile()

    authController = module.get<AuthController>(AuthController)
    authService = module.get<AuthService>(AuthService)

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
        await authService.register(dto)
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
