import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { UserPersistence } from './infrastructure/persistence/user.persistence'
import { SessionService } from '../session/session.service'
import { SessionPersistence } from '../session/infrastructure/persistence/session.persistence'
import { SessionModule } from '../session/session.module'


describe('UserService', () => {
  let service: UserService
  let userRepository: UserPersistence

  const mockUserRepository = {
    saveAndLogin: jest.fn(),
  }

  const mockSessionRepository = {
    create: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SessionModule],
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
        UserPersistence
      ],
    }).compile()

    service = module.get<UserService>(UserService)
    userRepository = module.get<UserPersistence>(UserPersistence)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
