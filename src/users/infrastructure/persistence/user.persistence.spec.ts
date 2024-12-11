import { Test, TestingModule } from '@nestjs/testing'
import { UserPersistence } from './user.persistence'
import { PrismaService } from '../../../database/prisma.service'
import { AuthProvidersEnum } from '../../../auth/auth.providers.enum'
import { Role } from '../../../roles/domain/role.domain'
import { Status } from '../../../statuses/domain/status.domain'
import { User } from '../../../users/domain/user.domain'

describe('UserPersistence', () => {
  let persistence: UserPersistence
  let prismaService: PrismaService

  const mockPrismaService = {
    user: {
      create: jest.fn(),
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserPersistence,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile()

    persistence = module.get<UserPersistence>(UserPersistence)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(persistence).toBeDefined()
  })

  /*it('should create a user', async () => {
    let role: Role | undefined = undefined
    role = { id: 2 }

    let status: Status | undefined = undefined
    status = { id: 2 }

    const clonedPayload = {
      firstName: 'Jan',
      lastName: 'Libal',
      password: 'Password123!',
      email: 'jan.libal@janlibal2.com',
      provider: AuthProvidersEnum.email,
      role: {id: 2}, 
      status: {id: 2}
    }

    const returnedUser: User = {
      id: 'fe918fd3-96b6-4573-ab9c-3c0c15a6a91d',
      email: 'jan.libal@janlibal.com',
      firstName: 'Jan',
      lastName: 'Libal',
      provider: AuthProvidersEnum.email,
      password: 'Password123!',
      role: {id: 2},
      status: {id:2}
    }

    const areturnedUser = {
      id: 'fe918fd3-96b6-4573-ab9c-3c0c15a6a91d',
      password: 'Password123!',
      email: 'todd.doe@joedoe.com'
    }
    //---mockPrismaService.user.create.mockResolvedValue(returnedUser)
    const result = await persistence.create(clonedPayload)
    expect(result).toEqual(returnedUser)
    //expect(result).toEqual(expect.objectContaining(returnedUser))

    expect(returnedUser).toEqual(
      expect.objectContaining({
        status: expect.objectContaining({ id: 2 }),
        role: expect.objectContaining({ id: 2 }),
      })
    )

    expect(result.id).toBe('fe918fd3-96b6-4573-ab9c-3c0c15a6a91d');
    expect(result.email).toBe('jan.libal@janlibal.com');
    expect(result.firstName).toBe('Jan');
    expect(result.lastName).toBe('Libal');
    expect(result.provider).toBe(AuthProvidersEnum.email);
    expect(result.password).toBe('Password123!');
    expect(result.role.id).toBe(2);
    expect(result.status.id).toBe(2);

    //---expect(mockPrismaService.user.create).toHaveBeenCalledWith({ data: clonedPayload })
  })*/
})
