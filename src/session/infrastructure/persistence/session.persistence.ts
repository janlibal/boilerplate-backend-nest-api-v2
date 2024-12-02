import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { NullableType } from 'src/utils/types/nullable.type'
import { User } from 'src/users/domain/user.domain'
import { Session } from 'src/session/domain/session.domain'
import { Session as SessionEntity } from '@prisma/client'

@Injectable()
export class SessionPersistence {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<SessionEntity> {
    return await this.prismaService.session.create({
      include: {
        user: true,
      },
      data: {
        hash: data.hash,
        userId: data.user.id
      },
    })
  }

  async deleteById(id: Session['id']): Promise<void> {
    await this.prismaService.session.delete({
      where: {
        id: id,
      },
    })
  }

  async findById(id: Session['id']): Promise<NullableType<SessionEntity>> {
    return await this.prismaService.session.findFirst({
      include: {
        user: true,
      },
      where: {
        id: id, //).toString()),
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
  ): Promise<SessionEntity | null> {
    return await this.prismaService.session.update({
      include: {
        user: true,
      },
      where: {
        id: id, //.toString()),
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
