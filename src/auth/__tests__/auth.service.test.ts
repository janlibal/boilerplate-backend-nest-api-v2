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
import {
  dto,
  loginData,
  loginDataBad,
  mockUser,
  mockUserGoogle,
  newUser,
  sessionData,
} from './mock/auth.data'
import UnauthorizedError from '../../exceptions/unauthorized.exception'
import UnprocessableError from '../../exceptions/unprocessable.exception'
import crypto from '../../utils/crypto'
import { SessionService } from '../../session/session.service'
import { RedisService } from '../../redis/redis.service'
import { RedisPrefixEnum } from '../../redis/enums/redis.prefix.enum'

//vi.mock('../../utils/crypto', () => mockCrypto)

const mockUserService = {
  create: vi.fn(),
  findByEmail: vi.fn(),
}

const mockSessionService = {
  create: vi.fn(),
}

const mockRedisService = {
  createSession: vi.fn(),
}

const mockCrypto = {
  comparePasswords: vi.fn(),
  makeHash: vi.fn(),
}

describe('AuthService', () => {
  let authService: AuthService
  let userService: UserService
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
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: SessionService,
          useValue: mockSessionService,
        },
        {
          provide: RedisService,
          useValue: mockRedisService,
        },
        JwtService,
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    userService = module.get<UserService>(UserService)
    sessionService = module.get<SessionService>(SessionService)
    redisService = module.get<RedisService>(RedisService)

    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('AuthSerivice methods', () => {
    describe('register()', () => {
      it('should register new user', async () => {
        mockUserService.create.mockResolvedValue(mockUser)
        await authService.register(dto)
        expect(mockUserService.create).toHaveBeenCalledWith(newUser)
      })
    })

    describe('validateLogin()', () => {
      it('should return user data after successul login', async () => {
        const prefix = RedisPrefixEnum.USER
        const expiry = 900000
        mockUserService.findByEmail.mockResolvedValue(mockUser)
        const comparePasswordsSpy = vi
          .spyOn(crypto, 'comparePasswords')
          .mockResolvedValue(true)
        const makeHashSpy = vi
          .spyOn(crypto, 'makeHash')
          .mockReturnValue('hash123')
        mockSessionService.create.mockResolvedValue(sessionData)
        mockRedisService.createSession.mockResolvedValue(true)

        const result = await authService.validateLogin(loginData)
        expect(result.refreshToken).toMatch(
          /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
        )
        expect(result.token).toMatch(
          /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
        )
        expect(result.tokenExpires).toBeDefined()
        expect(result.user).toEqual(mockUser)

        expect(mockUserService.findByEmail).toHaveBeenCalledWith(
          loginData.email,
        )
        expect(comparePasswordsSpy).toHaveBeenCalledWith(
          loginData.password,
          mockUser.password,
        )
        expect(makeHashSpy).toHaveBeenCalled()
        expect(mockSessionService.create).toHaveBeenCalledWith(sessionData)
        expect(mockRedisService.createSession).toHaveBeenCalledWith({
          prefix: prefix,
          user: result.user,
          token: result.token,
          expiry: expiry,
        })
      })

      it('should throw unauthorized if user is not found', async () => {
        mockUserService.findByEmail.mockResolvedValue(null)

        await expect(authService.validateLogin(loginData)).rejects.toThrow(
          new UnauthorizedError('Invalid email or password'),
        )
      })

      it('should throw Unauthorized if user provider is not email', async () => {
        mockUserService.findByEmail.mockResolvedValue(mockUserGoogle)

        await expect(authService.validateLogin(loginData)).rejects.toThrow(
          new UnprocessableError(
            `hasToLoginViaProvider:${mockUserGoogle.provider}`,
          ),
        )
      })

      it('should throw Unauthorized in case of missing password', async () => {
        mockUserService.findByEmail.mockResolvedValue(mockUserGoogle)

        await expect(authService.validateLogin(loginData)).rejects.toThrow(
          new UnprocessableError('missingPassword'),
        )
      })

      it('should throw error for invalid password', async () => {
        mockUserService.findByEmail.mockResolvedValue(mockUser)

        const comparePasswordsSpy = vi
          .spyOn(crypto, 'comparePasswords')
          .mockResolvedValue(false)

        await expect(authService.validateLogin(loginDataBad)).rejects.toThrow(
          new UnauthorizedError('Invalid email or password'),
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
})
