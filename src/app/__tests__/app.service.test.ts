import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { AppService } from '../app.service'
import { AppRepository } from '../app.reposiroty'
import { mockEnvData, mockEnv } from './mock/env-data'

// Mock Prisma Service
const mockAppRepository = {
  getEnv: vi.fn()
}

describe('AppService', () => {
  let appService: AppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: AppRepository,
          useValue: mockAppRepository
        }
      ]
    }).compile()

    appService = module.get<AppService>(AppService)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(appService).toBeDefined()
  })

  describe('compileData', () => {
    it('should capture env data', async () => {
      mockAppRepository.getEnv.mockResolvedValue(mockEnv)
      const result = await appService.compileData()
      expect(result).toEqual(mockEnvData)
    })
  })
})
