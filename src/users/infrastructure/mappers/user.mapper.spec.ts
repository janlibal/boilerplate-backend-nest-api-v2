// user.mapper.spec.ts
import { User } from '../../../users/domain/user.domain';
import { UserMapper } from './user.mapper';
import { RoleEnum, User as UserEntity } from '@prisma/client';
import { AuthProvidersEnum } from '../../../auth/auth.providers.enum';
import { Role } from '@prisma/client'

describe('UserMapper', () => {
  describe('toDomain', () => {
    it('should convert UserEntity to User domain object', async () => {
      // Arrange: Create a mock UserEntity
      let role: Role | undefined = undefined
      role = { id: 2, role: RoleEnum.user }

      const persistenceModel: UserEntity = {
        id: 'fe918fd3-96b6-4573-ab9c-3c0c15a6a91d',
        firstName: 'Jan',
        lastName: 'Libal',
        email: 'jan.libal@janlibal2.com',
        password: 'Password123!',
        provider: AuthProvidersEnum.email,
        roleId: 2,
        statusId: 2
      };

      // Act: Convert UserEntity to User domain object
      const userEntity = await UserMapper.toDomain(persistenceModel);

      // Assert: Verify that the conversion is correct
      expect(userEntity).toBeInstanceOf(User);
      expect(userEntity.firstName).toBe(persistenceModel.firstName);
      expect(userEntity.lastName).toBe(persistenceModel.lastName);
      expect(userEntity.email).toBe(persistenceModel.email);
      expect(userEntity.password).toBe(persistenceModel.password);
      expect(userEntity.provider).toBe(persistenceModel.provider);
      expect(userEntity.role.id).toBe(persistenceModel.roleId);
      expect(userEntity.status.id).toBe(persistenceModel.statusId);
    });
  });

  describe('toPersistence', () => {
    it('should convert User domain object to UserEntity', async () => {
      // Arrange: Create a mock User domain object
      const clonedPayload = {
        firstName: 'Jan',
        lastName: 'Libal',
        password: 'Password123!',
        email: 'jan.libal@janlibal2.com',
        provider: AuthProvidersEnum.email,
        roleId: 2, 
        statusId: 2
      }

      const persistenceEntity: User = {
        //id: 'fe918fd3-96b6-4573-ab9c-3c0c15a6a91d',
        firstName: 'Jan',
        lastName: 'Libal',
        email: 'jan.libal@janlibal2.com',
        password: 'Password123!',
        provider: AuthProvidersEnum.email,
        role: {id:2}, 
        status: {id:2}
      }

      // Act: Convert User domain object to UserEntity
      const userEntity = await UserMapper.toPersistence(persistenceEntity);

      // Assert: Verify that the conversion is correct
      expect(userEntity.firstName).toBe(persistenceEntity.firstName);
      expect(userEntity.lastName).toBe(persistenceEntity.lastName);
      expect(userEntity.email).toBe(persistenceEntity.email);
      expect(userEntity.password).toBe(persistenceEntity.password);
      expect(userEntity.provider).toBe(persistenceEntity.provider);
      expect(userEntity.roleId).toBe(persistenceEntity.role.id);
      expect(userEntity.statusId).toBe(persistenceEntity.status.id);
    });
  });
});
