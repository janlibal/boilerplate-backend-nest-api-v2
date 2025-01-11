import { Test, TestingModule } from '@nestjs/testing'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import { AppRepository } from '../app.reposiroty'


describe('AppRepository', () => {
  let appRepository: AppRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppRepository],
    }).compile()

    appRepository = module.get<AppRepository>(AppRepository)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(appRepository).toBeDefined()
  })
})
