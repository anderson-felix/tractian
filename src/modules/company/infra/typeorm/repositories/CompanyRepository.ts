import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import { MongoRepository, getMongoRepository, ObjectID } from 'typeorm';
import { isValidObjectId } from 'mongoose';

import { Company } from '../entities/Company';

export default class CompanyRepository implements ICompanyRepository {
  private repository: MongoRepository<Company>;

  constructor() {
    this.repository = getMongoRepository(Company);
  }

  public async create(data: ICreateCompanyDTO) {
    const company = this.repository.create(data);

    return await this.repository.save(company);
  }

  public async save(company: Company) {
    await this.repository.update(company.id, company);
    return company;
  }

  public async findAll() {
    const a = await this.repository.find();
    return a;
  }

  public async findAllWithDeleted() {
    return await this.repository.find();
  }

  public async findById(id: ObjectID | string) {
    return id && isValidObjectId(id)
      ? await this.repository.findOne(id, {
          where: { deleted_at: { $eq: null } },
        })
      : undefined;
  }

  public async findByIdWithDeleted(id: ObjectID | string) {
    return id && isValidObjectId(id)
      ? await this.repository.findOne(id)
      : undefined;
  }

  public async delete(company: Company) {
    await this.repository.delete(company);
  }
}
