import { Test, TestingModule } from '@nestjs/testing'
import { SessionService } from '../session/session.service'
import { SessionPersistence } from '../session/infrastructure/persistence/session.persistence'
import { SessionModule } from './session.module'



describe('SessionService', () => {
  let service: SessionService
  let sessionPersistence: SessionPersistence

  const mockSessionPersistence = {
    saveAndLogin: jest.fn(),
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SessionModule],
      providers: [
        SessionService,
        { 
            provide: SessionPersistence, 
            useValue: mockSessionPersistence 
        },
        SessionPersistence
      ],
    }).compile()

    service = module.get<SessionService>(SessionService)
    sessionPersistence = module.get<SessionPersistence>(SessionPersistence)
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
