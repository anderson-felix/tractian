import { ObjectID } from 'typeorm';

import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import { User } from '@modules/user/infra/typeorm/entities/User';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  saveMany(user: User[]): Promise<void>;
  findById(id: ObjectID | string): Promise<User | undefined>;
  findByIdWithDeleted(id: ObjectID | string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  findByCompanyId(companyId: ObjectID | string): Promise<User[]>;
  delete(user: User): Promise<void>;
  deleteByCompanyId(companyId: ObjectID | string): Promise<void>;
  deleteMany(user: User[]): Promise<void>;
}
