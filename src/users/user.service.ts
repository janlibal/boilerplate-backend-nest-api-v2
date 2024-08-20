import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common'
import { UserRepository } from './user.repository'
import { User } from './domain/user.domain'
import { NullableType } from 'src/utils/types/nullable.type'
import { CreateUserDto } from './dto/create.user.dto'
import { AuthProvidersEnum } from 'src/auth/auth.providers.enum'
import crypto from 'src/utils/crypto'
import { RoleEnum } from 'src/roles/roles.enum'
import { StatusEnum } from 'src/statuses/statuses.enum'
//import * as crypto from 'crypto'
//import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
    const clonedPayload = {
      firstName: createProfileDto.firstName,
      lastName: createProfileDto.lastName,
      password: await crypto.hashPassword(createProfileDto.password), //createProfileDto.password,
      email: createProfileDto.email,
      provider: AuthProvidersEnum.email,
      role: createProfileDto.role,
      status: createProfileDto.status,
      //...createProfileDto,
    }

    /*if (clonedPayload.password) {
      const salt = await bcrypt.genSalt();
      clonedPayload.password = await bcrypt.hash(clonedPayload.password, salt);
    }*/

    if (clonedPayload.role?.id) {
      const roleObject = Object.values(RoleEnum)
        .map(String)
        .includes(String(clonedPayload.role.id))
      if (!roleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role: 'roleNotExists',
          },
        })
      }
    }

    if (clonedPayload.status?.id) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(clonedPayload.status.id))
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        })
      }
    }

    const userObject = await this.userRepository.findByEmail(
      clonedPayload.email,
    )
    if (userObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          email: 'emailAlreadyExists',
        },
      })
    }

    return await this.userRepository.create(clonedPayload)
  }

  async remove(id: User['id']): Promise<void> {
    await this.userRepository.remove(id)
  }
}
