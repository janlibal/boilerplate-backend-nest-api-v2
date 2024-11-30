import { Injectable } from '@nestjs/common'
import { NullableType } from 'src/utils/types/nullable.type'
import { PrismaService } from 'src/database/prisma.service'
import { User } from 'src/users/domain/user.domain'

@Injectable()
export class UserPersistence {
  constructor(private prismaService: PrismaService) {}

  async findById(id: User['id']): Promise<NullableType<User>> {
    return await this.prismaService.user.findUnique({
      where: { id: String(id) },
    })
  }

  async findMany(): Promise<User[]> {
    return await this.prismaService.user.findMany()
  }

  async findByEmail(email: User['email']): Promise<NullableType<User>> {
    return await this.prismaService.user.findFirst({ where: { email: email } })
  }

  async create(clonedPayload: User): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        firstName: clonedPayload.firstName,
        lastName: clonedPayload.lastName,
        password: clonedPayload.password,
        email: clonedPayload.email,
        statusId: clonedPayload.status.id,
        roleId: clonedPayload.role.id,
      },
    })
  }

  async remove(id: User['id']): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id: id, //String(id),
      },
    })
  }
}
