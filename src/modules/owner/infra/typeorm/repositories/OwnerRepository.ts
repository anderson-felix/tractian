import ICreateOwnerDTO from '@modules/owner/dtos/ICreateOwnerDTO';
import IOwnerRepository from '@modules/owner/repositories/IOwnerRepository';
import { isValidObjectId } from 'mongoose';
import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';

import { Owner } from '../entities/Owner';

export default class OwnerRepository implements IOwnerRepository {
  private repository: MongoRepository<Owner>;

  constructor() {
    this.repository = getMongoRepository(Owner);
  }

  public async create(data: ICreateOwnerDTO): Promise<Owner> {
    const user = this.repository.create(data);

    return this.repository.save(user);
  }

  public async save(owner: Owner) {
    return await this.repository.save(owner);
  }

  public async saveMany(owners: Owner[]) {
    await this.repository.save(owners);
  }

  public async findAll() {
    return await this.repository.find({ where: { deleted_at: null } });
  }

  public async findAllWithDeleted() {
    return await this.repository.find();
  }

  public async findById(id: ObjectID | string) {
    return id && isValidObjectId(id)
      ? await this.repository.findOne(id, { where: { deleted_at: null } })
      : undefined;
  }

  public async findByCompanyId(companyId: ObjectID | string) {
    return await this.repository.find({
      where: { company_id: { $eq: companyId } },
    });
  }

  public async findByIds(ids: ObjectID[] | string[]) {
    return await this.repository.findByIds(ids, {
      where: { deleted_at: null },
    });
  }

  public async findByIdWithDeleted(id: ObjectID | string) {
    return id && isValidObjectId(id)
      ? await this.repository.findOne(id)
      : undefined;
  }

  public async delete(owner: Owner) {
    await this.repository.delete(owner.id);
  }

  public async deleteMany(owners: Owner[]) {
    await this.repository.deleteMany(owners);
  }
}
