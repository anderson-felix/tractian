import { ObjectID } from 'typeorm';
import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import { Company } from '../infra/typeorm/entities/Company';

export default interface ICompanyRepository {
  create(data: ICreateCompanyDTO): Promise<Company>;
  save(data: Company): Promise<Company>;
  findAll(): Promise<Company[]>;
  findAllWithDeleted(): Promise<Company[]>;
  findById(id: ObjectID | string): Promise<Company | undefined>;
  findByIdWithDeleted(id: ObjectID | string): Promise<Company | undefined>;
  delete(data: Company): Promise<void>;
}
