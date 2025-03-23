import { Injectable } from '@nestjs/common'
import { NullableType } from '../../../utils/types/nullable.type'
import { PrismaService } from '../../../database/prisma.service'
import { User } from '../../../users/domain/user.domain'
import { UserMapper } from '../mappers/user.mapper'

@Injectable()
export class UserPersistence {
  constructor(private prismaService: PrismaService) {}

  async findById(id: User['id']): Promise<NullableType<User>> {
    const entity = await this.prismaService.user.findUnique({
      where: { id: String(id) },
    })
    return entity ? await UserMapper.toDomain(entity) : null
  }

  /*async findMany(): Promise<User[]> {
    return await this.prismaService.user.findMany()
  }*/

  async findByEmail(email: User['email']): Promise<NullableType<User>> {
    if (!email) return null
    const entity = await this.prismaService.user.findUnique({
      where: { email },
    })
    return entity ? await UserMapper.toDomain(entity) : null
  }

  async create(clonedPayload: User): Promise<User> {
    const persistenceModel = await UserMapper.toPersistence(clonedPayload)
    const newEntity = await this.prismaService.user.create({
      data: persistenceModel,
    })
    return await UserMapper.toDomain(newEntity)
  }

  async remove(id: User['id']): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id: id,
      },
    })
  }
}
