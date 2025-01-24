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
import configModuleSetup from '../../config/config.module'
import { SessionService } from '../../session/session.service'
import { RedisService } from '../../redis/redis.service'
import { AuthController } from '../auth.controller'
import { dto, loginData, mockUser, newUser } from './mock/auth.data'
import exp from 'constants'

//vi.mock('../../utils/crypto', () => mockCrypto)

const mockAuthService = {
  register: vi.fn(),
  validateLogin: vi.fn(),
}

describe('AuthService', () => {
  let authController: AuthController
  let authService: AuthService
  let sessionService: SessionService
  let redisService: RedisService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        UserPersistenceModule,
        SessionModule,
        SessionPersistenceModule,
        RedisModule,
        PrismaModule,
        configModuleSetup(),
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

  describe('register()', () => {
    it('should register new user', async () => {
      mockAuthService.register.mockResolvedValue(mockUser)
      await authService.register(dto)
      expect(mockAuthService.register).toHaveBeenCalledWith(dto)
    })
  })
})
