import { Injectable } from '@nestjs/common'
import { Session } from './domain/session.domain'
import { PrismaService } from 'src/database/prisma.service'
import { NullableType } from 'src/utils/types/nullable.type'
import { User } from 'src/users/domain/user.domain'

@Injectable()
export class SessionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Session> {
    return await this.prismaService.session.create({
      include: {
        user: true,
      },
      data: {
        hash: data.hash,
        user: {
          connect: {
            id: data.user.id, //.toString(),
          },
        },
      },
    })
  }

  async deleteById(id: Session['id']): Promise<void> {
    await this.prismaService.session.delete({
      where: {
        id: Number(id),
      },
    })
  }

  async findById(id: Session['id']): Promise<NullableType<Session>> {
    return await this.prismaService.session.findFirst({
      include: {
        user: true,
      },
      where: {
        id: Number(id), //).toString()),
      },
    })
  }

  async deleteByUserId(conditions: { userId: User['id'] }): Promise<void> {
    await this.prismaService.session.delete({
      include: {
        user: true,
      },
      where: {
        id: Number(conditions.userId),
      },
    })
  }

  async update(
    id: Session['id'],
    payload: Partial<
      Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    >,
  ): Promise<Session | null> {
    return await this.prismaService.session.update({
      include: {
        user: true,
      },
      where: {
        id: Number(id), //.toString()),
      },
      data: {
        hash: payload.hash,
        user: {
          connect: {
            id: payload.user.id, //.toString(),
          },
        },
      },
    })
  }
  /*
  async deleteByUserIdWithExclude(conditions: {
    userId: User['id']
    excludeSessionId: Session['id']
  }): Promise<void> {
    await this.prismaService.session.delete({
      include: {
        user: true,
      },
      where: {
        id: Number(conditions.userId),
      },
    })
  }*/
}
