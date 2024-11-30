import { User } from "src/users/domain/user.domain";
import { NullableType } from "src/utils/types/nullable.type";

export abstract class UserRepository {
  abstract create(data: Omit<User, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>): Promise<User>
  
  abstract findByEmail(email: User['email']): Promise<NullableType<User>>
  
  abstract findById(id: User['id']): Promise<NullableType<User>>
  
  abstract findMany(): Promise<User[]>
  
  abstract remove(id: User['id']): Promise<void>
}
