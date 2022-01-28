import { ObjectID } from 'typeorm';

import ICreateOwnerDTO from '@modules/owner/dtos/ICreateOwnerDTO';
import { Owner } from '@modules/owner/infra/typeorm/entities/Owner';

export default interface IOwnerRepository {
  create(data: ICreateOwnerDTO): Promise<Owner>;
  save(user: Owner): Promise<Owner>;
  saveMany(user: Owner[]): Promise<void>;
  findById(id: ObjectID | string): Promise<Owner | undefined>;
  findByIds(ids: ObjectID[] | string[]): Promise<Owner[]>;
  findByIdWithDeleted(id: ObjectID | string): Promise<Owner | undefined>;
  findAll(): Promise<Owner[]>;
  delete(user: Owner): Promise<void>;
  deleteMany(user: Owner[]): Promise<void>;
}
