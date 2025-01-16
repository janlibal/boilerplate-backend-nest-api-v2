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
import configModuleSetup from 'src/config/config.module'
import { dto } from './mock/auth.data'



const mockUserService = {
    create: vi.fn(),
    findByEmail: vi.fn()
}

describe('UserService', () => {
  let authService: AuthService
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, UserPersistenceModule, SessionModule, SessionPersistenceModule, RedisModule, PrismaModule, configModuleSetup()],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        }, 
        JwtService
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    userService = module.get<UserService>(UserService)
    

    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  it('register()', async () => {
    mockUserService.create.mockResolvedValue(dto)
    const result = await authService.register(dto)
    expect(result).toBeUndefined()
  })
})
