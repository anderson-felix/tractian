import { MongoRepository, getMongoRepository } from 'typeorm';
import { isValidObjectId } from 'mongoose';

import IUnitRepository from '@modules/unit/repositories/IUnitRepository';
import ICreateUnitDTO from '@modules/unit/dtos/ICreateUnitDTO';
import { Unit } from '../entities/Unit';

export default class UnitRepository implements IUnitRepository {
  private repository: MongoRepository<Unit>;

  constructor() {
    this.repository = getMongoRepository(Unit);
  }

  public async create(data: ICreateUnitDTO) {
    const unit = this.repository.create(data);

    return await this.repository.save(unit);
  }

  public async save(data: Unit) {
    return await this.repository.save(data);
  }

  public async saveMany(units: Unit[]) {
    await Promise.all(units.map(unit => this.repository.update(unit.id, unit)));
  }

  public async findAll() {
    return await this.repository.find({ where: { deleted_at: null } });
  }

  public async findByCompanyId(companyId: string) {
    return await this.repository.find({
      where: { company_id: companyId },
    });
  }

  public async findById(id: string) {
    return id && isValidObjectId(id)
      ? await this.repository.findOne(id, {
          where: { deleted_at: null },
        })
      : undefined;
  }

  public async findByIdWithDeleted(id: string) {
    return id && isValidObjectId(id)
      ? await this.repository.findOne(id)
      : undefined;
  }

  public async deleteByCompanyId(companyId: string) {
    const assets = await this.repository.find({
      where: { company_id: { $eq: companyId } },
    });

    await this.repository.deleteMany(assets);
  }

  public async delete(unit: Unit) {
    await this.repository.delete(unit.id);
  }

  public async deleteMany(units: Unit[]) {
    await this.repository.deleteMany(units);
  }
}
