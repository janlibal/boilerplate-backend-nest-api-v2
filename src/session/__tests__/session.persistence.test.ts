import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { PrismaService } from '../../database/prisma.service'
import { SessionPersistence } from '../infrastructure/persistence/session.persistence'
import { SessionMapper } from '../infrastructure/mappers/session.mapper'
import {
  sessionMockDomainObject,
  sessionMockEntityObject,
  sessionObject
} from './mock/session.data'

const mockPrismaService = {
  session: {
    create: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    delete: vi.fn()
  }
}

describe('SessionPersistence', () => {
  let sessionPersistence: SessionPersistence
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionPersistence, { provide: PrismaService, useValue: mockPrismaService }]
    }).compile()

    sessionPersistence = module.get<SessionPersistence>(SessionPersistence)
    prismaService = module.get<PrismaService>(PrismaService)

    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sessionPersistence).toBeDefined()
  })

  describe('SessionPersistence methods', () => {
    describe('deleteByUserId()', () => {
      it('should delte user by provided user Id', async () => {
        vi.spyOn(prismaService.session, 'delete').mockResolvedValue(null)

        const conditions = {
          userId: sessionMockDomainObject.userId
        }

        await sessionPersistence.deleteByUserId(conditions)

        expect(mockPrismaService.session.delete).toHaveBeenCalledWith({
          include: { user: true },
          where: { id: Number(conditions.userId) }
        })

        expect(prismaService.session.delete).toHaveBeenCalledTimes(1)
      })
    })

    describe('deleteById', () => {
      it('should delete session by provided session Id', async () => {
        vi.spyOn(prismaService.session, 'delete').mockResolvedValue(null)

        await sessionPersistence.deleteById(sessionMockDomainObject.id)

        expect(mockPrismaService.session.delete).toHaveBeenCalledWith({
          where: { id: sessionMockDomainObject.id }
        })

        expect(prismaService.session.delete).toHaveBeenCalledTimes(1)
      })
    })

    describe('findById', () => {
      it('should find session by provided Id', async () => {
        vi.spyOn(prismaService.session, 'findFirst').mockResolvedValue(sessionMockEntityObject)

        const result = await sessionPersistence.findById(sessionMockDomainObject.id)

        expect(result).toEqual(sessionMockDomainObject)

        expect(mockPrismaService.session.findFirst).toHaveBeenCalledWith({
          include: { user: true },
          where: { id: sessionMockDomainObject.id }
        })
      })
    })

    describe('create()', () => {
      it('should create session', async () => {
        const persistenceModel = await SessionMapper.toPersistence(sessionObject)

        vi.spyOn(prismaService.session, 'create').mockResolvedValue(sessionMockEntityObject)

        const result = await sessionPersistence.create(sessionObject)

        expect(result).toEqual(sessionMockDomainObject)

        expect(mockPrismaService.session.create).toHaveBeenCalledWith({
          data: persistenceModel
        })
      })
    })
  })
})
