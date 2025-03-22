import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { PrismaService } from '../../database/prisma.service'
import { PrismaModule } from '../../database/prisma.module'
import { SessionService } from '../session.service'
import { SessionPersistence } from '../infrastructure/persistence/session.persistence'
import { SessionModule } from '../session.module'
import { SessionPersistenceModule } from '../infrastructure/session.infrastructure.module'
import { sessionMockDomainObject, sessionObject } from './mock/session.data'

// Mock Prisma Service
const mockSessionPersistence = {
  create: vi.fn(),
  findByEmail: vi.fn(),
  findById: vi.fn(),
  deleteById: vi.fn(),
  deleteByUserId: vi.fn(),
}

describe('SessionService', () => {
  let sessionService: SessionService
  let sessionPersistence: SessionPersistence

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SessionModule, SessionPersistenceModule, PrismaModule],
      providers: [
        SessionService,
        {
          provide: SessionPersistence,
          useValue: mockSessionPersistence,
        },
        PrismaService,
      ],
    }).compile()

    sessionService = module.get<SessionService>(SessionService)
    sessionPersistence = module.get<SessionPersistence>(SessionPersistence)

    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sessionService).toBeDefined()
  })

  describe('SessionService methods', () => {
    it('deleteByUserId()', async () => {
      vi.spyOn(mockSessionPersistence, 'deleteByUserId').mockResolvedValue(null)

      const conditions = {
        userId: sessionMockDomainObject.userId,
      }

      await sessionPersistence.deleteByUserId(conditions)

      expect(mockSessionPersistence.deleteByUserId).toHaveBeenCalledWith(
        conditions,
      )

      expect(sessionPersistence.deleteByUserId).toHaveBeenCalledTimes(1)
    })

    it('deleteById()', async () => {
      vi.spyOn(mockSessionPersistence, 'deleteById').mockResolvedValue(null)

      await sessionPersistence.deleteById(sessionMockDomainObject.id)

      expect(mockSessionPersistence.deleteById).toHaveBeenCalledWith(
        sessionMockDomainObject.id,
      )

      expect(sessionPersistence.deleteById).toHaveBeenCalledTimes(1)
    })

    it('findById()', async () => {
      mockSessionPersistence.findById.mockResolvedValue(sessionMockDomainObject)
      const result = await sessionPersistence.findById(
        sessionMockDomainObject.id,
      )
      expect(result).toEqual(sessionMockDomainObject)
      //expect(mockPlaylistRepository.save).toHaveBeenCalledWith({data: createPlaylist,})
    })

    it('create()', async () => {
      mockSessionPersistence.create.mockResolvedValue(sessionMockDomainObject)
      const result = await sessionPersistence.create(sessionObject)
      expect(result).toEqual(sessionMockDomainObject)
      //expect(mockUserPersistence.create).toHaveBeenCalledWith({data: userMockEntityObject,})
    })
  })
})
