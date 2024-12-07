import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { NullableType } from 'src/utils/types/nullable.type'
import { User } from 'src/users/domain/user.domain'
import { Session } from 'src/session/domain/session.domain'
import { Session as SessionEntity } from '@prisma/client'
import { SessionMapper } from '../mappers/session.mapper'

@Injectable()
export class SessionPersistence {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Session): Promise<Session> {
    const persistenceEntity = await SessionMapper.toPersistence(data)
    const newEntity = await this.prismaService.session.create({data: persistenceEntity})
    return await SessionMapper.toDomain(newEntity)
  }


  async deleteById(id: Session['id']): Promise<void> {
    await this.prismaService.session.delete({ where: { id: id, },})}

  async findById(id: Session['id']): Promise<NullableType<Session>> {
    const entity = await this.prismaService.session.findFirst({ include: { user: true, }, where: { id: id },})
    return entity ? await SessionMapper.toDomain(entity) : null;
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
            id: payload.userId, //.toString(),
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
