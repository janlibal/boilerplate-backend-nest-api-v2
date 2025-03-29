import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { SessionService } from '../session.service'
import { SessionRepository } from '../infrastructure/repository/session.repository'
import { sessionMockDomainObject, sessionObject } from './mock/session.data'
import { User } from '../../users/domain/user.domain'

const mockSessionRepository = {
  findById: vi.fn(),
  deleteById: vi.fn(),
  deleteByUserId: vi.fn(),
  create: vi.fn(),
}

describe('SessionService', () => {
  let sessionService: SessionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        {
          provide: SessionRepository,
          useValue: mockSessionRepository,
        },
      ],
    }).compile()

    sessionService = module.get<SessionService>(SessionService)

    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sessionService).toBeDefined()
  })

  describe('SessionService methods', () => {
    describe('findById()', () => {
      it('should find session by provided Id', async () => {
        mockSessionRepository.findById.mockResolvedValue(
          sessionMockDomainObject,
        )
        const result = await sessionService.findById(sessionMockDomainObject.id)
        expect(result).toEqual(sessionMockDomainObject)
        expect(mockSessionRepository.findById).toHaveBeenCalledWith(
          sessionMockDomainObject.id,
        )
      })
    })
    describe('deleteById()', () => {
      it('should delete session by provided sessionId', async () => {
        mockSessionRepository.deleteById.mockResolvedValue(true)
        await sessionService.deleteById(sessionMockDomainObject.id)
        expect(mockSessionRepository.deleteById).toHaveBeenCalledWith(
          sessionMockDomainObject.id,
        )
      })
    })
    describe('deleteByUserId()', () => {
      it('should delete session by provided userId', async () => {
        const conditions = { userId: User['id'] }
        mockSessionRepository.deleteByUserId.mockResolvedValue(true)
        await sessionService.deleteByUserId(conditions)
        expect(mockSessionRepository.deleteByUserId).toHaveBeenCalledWith(
          conditions,
        )
      })
    })
    describe('create()', () => {
      it('should create new session in Db', async () => {
        mockSessionRepository.create.mockResolvedValue(sessionMockDomainObject)
        const result = await sessionService.create(sessionObject)
        expect(result).toEqual(sessionMockDomainObject)
        expect(mockSessionRepository.create).toHaveBeenCalledWith(sessionObject)
      })
    })
  })
})
