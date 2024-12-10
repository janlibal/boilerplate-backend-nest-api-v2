import { Test, TestingModule } from '@nestjs/testing'

import { SessionService } from '../session/session.service'
import { SessionPersistence } from '../session/infrastructure/persistence/session.persistence'
import { SessionModule } from '../session/session.module'
import { AuthService } from './auth.service'
import { UserService } from '../users/user.service'
import { UserModule } from '../users/user.module'
import { AuthModule } from './auth.module'
import { RedisModule } from 'src/redis/redis.module'


describe('AuthService', () => {
  let service: AuthService
  

  const mockUserRepository = {
    saveAndLogin: jest.fn(),
  }

  const mockSessionRepository = {
    create: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UserModule,SessionModule, RedisModule],
      providers: [
        SessionService,
        { 
            provide: SessionPersistence, 
            useValue: mockSessionRepository 
        },
        UserService,
        {
          provide: UserService,
          useValue: mockUserRepository,
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
