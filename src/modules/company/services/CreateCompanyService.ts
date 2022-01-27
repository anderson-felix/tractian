import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';
import { Company } from '@modules/company/infra/typeorm/entities/Company';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';

export class CreateCompanyService {
  constructor(private companyRepository: ICompanyRepository) {}

  public async execute(data: ICreateCompanyDTO): Promise<Company> {
    return await this.companyRepository.create(data);
  }
}
