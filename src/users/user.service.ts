import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common'
import { User } from './domain/user.domain'
import { NullableType } from '../utils/types/nullable.type'
import { CreateUserDto } from './dto/create.user.dto'
import { AuthProvidersEnum } from '../auth/auth.providers.enum'
import crypto from '../utils/crypto'
import { RoleEnum } from '../roles/roles.enum'
import { StatusEnum } from '../statuses/statuses.enum'
import ResourceExistsError from '../exceptions/already.exists.exception'
import { UserRepository } from './infrastructure/repository/user.repository'
import { Role } from '../roles/domain/role.domain'
import { Status } from '../statuses/domain/status.domain'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findByEmail(email: User['email']): Promise<NullableType<User>> {
    return this.userRepository.findByEmail(email)
  }

  findById(id: User['id']): Promise<NullableType<User>> {
    const data = this.userRepository.findById(id)
    if (!data) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'userAlreadyExists',
        },
      })
    }
    return data
  }

  async create(createProfileDto: CreateUserDto): Promise<User> {
    let email: string | null = null
    if (createProfileDto.email) {
      const userObject = await this.userRepository.findByEmail(
        createProfileDto.email,
      )
      if (userObject) {
        throw new ResourceExistsError(userObject.email)
      }
      email = createProfileDto.email
    }

    let password: string | undefined = undefined
    if (createProfileDto.password) {
      password = await crypto.hashPassword(createProfileDto.password)
    }

    let role: Role | undefined = undefined
    if (createProfileDto.role?.id) {
      const roleObject = Object.values(RoleEnum)
        .map(String)
        .includes(String(createProfileDto.role.id))
      if (!roleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role: 'roleNotExists',
          },
        })
      }
    }
    role = {
      id: createProfileDto.role.id,
    }

    let status: Status | undefined = undefined
    if (createProfileDto.status?.id) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(createProfileDto.status.id))
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        })
      }
      status = {
        id: createProfileDto.status.id,
      }
    }

    const clonedPayload = {
      firstName: createProfileDto.firstName,
      lastName: createProfileDto.lastName,
      password: password, //await crypto.hashPassword(createProfileDto.password), //createProfileDto.password,
      email: email, //createProfileDto.email,
      provider: createProfileDto.provider ?? AuthProvidersEnum.email,
      role: role, //createProfileDto.role,
      status: status,
      //...createProfileDto,
    }

    return await this.userRepository.create(clonedPayload)
  }

  async remove(id: User['id']): Promise<void> {
    await this.userRepository.remove(id)
  }
}
