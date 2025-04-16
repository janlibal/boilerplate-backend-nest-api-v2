import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { AppService } from '../app.service'
import { mockEnvData } from './mock/env-data'
import { AppController } from '../app.controller'

// Mock Prisma Service
const mockAppService = {
  compileData: vi.fn()
}

describe('AppService', () => {
  let appController: AppController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppController,
        {
          provide: AppService,
          useValue: mockAppService
        }
      ]
    }).compile()

    appController = module.get<AppController>(AppController)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(appController).toBeDefined()
  })

  describe('compileData', () => {
    it('should capture system environment data', async () => {
      mockAppService.compileData.mockResolvedValue(mockEnvData)
      const result = await appController.getApiInfo()
      expect(result).toEqual(mockEnvData)
    })
  })
})
