import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { AuthService } from '../auth.service'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../../users/user.service'
import { UserModule } from '../../users/user.module'
import { UserPersistenceModule } from '../../users/infrastructure/user.infrastructure.module'
import { PrismaModule } from '../../database/prisma.module'
import { SessionModule } from '../../session/session.module'
import { SessionPersistenceModule } from '../../session/infrastructure/session.infrastructure.module'
import { RedisModule } from '../../redis/redis.module'
import configModuleSetup from '../../config/config.module'
import { dto, loginData, loginDataBad, mockSession, mockUser, mockUserGoogle, sessionData } from './mock/auth.data'
import UnauthorizedError from '../../exceptions/unauthorized.exception'
import UnprocessableError from '../../exceptions/unprocessable.exception'
import crypto from '../../utils/crypto'
import { SessionService } from '../../session/session.service'

//vi.mock('../../utils/crypto', () => mockCrypto)

const mockUserService = {
    create: vi.fn(),
    findByEmail: vi.fn()
}

const mockSessionService = {
  create: vi.fn(),
}

const mockCrypto = {
  comparePasswords: vi.fn(),
  makeHash: vi.fn(),
}

describe('AuthService', () => {
  let authService: AuthService
  let userService: UserService
  let sessionService: SessionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, UserPersistenceModule, SessionModule, SessionPersistenceModule, RedisModule, PrismaModule, configModuleSetup()],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        }, 
        {
          provide: SessionService,
          useValue: mockSessionService,
        },
        JwtService
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    userService = module.get<UserService>(UserService)
    sessionService = module.get<SessionService>(SessionService)
    

    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('register()', () => {
    it('should return new user', async () => {
      mockUserService.create.mockResolvedValue(dto)
      const result = await authService.register(dto)
      expect(result).toBeUndefined()
    })
  })

  describe('validateLogin()', () => {
    it('should throw unauthorized if user is not found', async () => {
      mockUserService.findByEmail.mockResolvedValue(null)

      await expect(authService.validateLogin(loginData)).rejects.toThrow(
        new UnauthorizedError('Invalid email or password'),
      )
    })

    it('should throw Unauthorized if user provider is not email', async () => {
      mockUserService.findByEmail.mockResolvedValue(mockUserGoogle)

      await expect(authService.validateLogin(loginData)).rejects.toThrow(
        new UnprocessableError(`hasToLoginViaProvider:${mockUserGoogle.provider}`),
      )
    })

    it('should throw Unauthorized in case of missing password', async () => {
      mockUserService.findByEmail.mockResolvedValue(mockUserGoogle)

      await expect(authService.validateLogin(loginData)).rejects.toThrow(
        new UnprocessableError('missingPassword')
      )
    })

    it('should throw error for invalid password', async () => {
      mockUserService.findByEmail.mockResolvedValue(mockUser)

      const comparePasswordsSpy = vi
        .spyOn(crypto, 'comparePasswords')
        .mockResolvedValue(false)

      await expect(authService.validateLogin(loginDataBad)).rejects.toThrow(
        new UnauthorizedError('Invalid email or password')
      )

      expect(comparePasswordsSpy).toHaveBeenCalledWith(
        loginDataBad.password,
        mockUser.password,
      )
      expect(mockUserService.findByEmail).toHaveBeenCalledWith(
        loginDataBad.email,
      )
    }) 
  })
})
