import { Injectable } from '@nestjs/common'
import { NullableType } from 'src/utils/types/nullable.type'
import { PrismaService } from 'src/database/prisma.service'
import { User } from 'src/users/domain/user.domain'
import {User as UserEntity } from '@prisma/client'
import { UserMapper } from '../mappers/user.mapper'

@Injectable()
export class UserPersistence {
  constructor(private prismaService: PrismaService) {}

  async findById(id: User['id']): Promise<NullableType<User>> {
    const entity = await this.prismaService.user.findUnique({ where: { id: String(id) } })
    return entity ? await UserMapper.toDomain(entity) : null
  }

  /*async findMany(): Promise<User[]> {
    return await this.prismaService.user.findMany()
  }*/

  async findByEmail(email: User['email']): Promise<NullableType<User>> {
    if (!email) return null
    const entity = await this.prismaService.user.findFirst({ where: { email: email } })
    return entity ? await UserMapper.toDomain(entity) : null
    
  }

  async create(clonedPayload: User): Promise<User> {
    const persistenceModel = await UserMapper.toPersistence(clonedPayload)
    const newEntity = await this.prismaService.user.create({
      data: {
        firstName: persistenceModel.firstName,
        lastName: persistenceModel.lastName,
        password: persistenceModel.password,
        email: persistenceModel.email,
        status: {
          connect: {
            id: persistenceModel.statusId
          }
        },
        role: {
          connect: {
            id: persistenceModel.roleId
          }
        }
      },
    })
    return await UserMapper.toDomain(newEntity)
  }

  async remove(id: User['id']): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id: id
      },
    })
  }
}
