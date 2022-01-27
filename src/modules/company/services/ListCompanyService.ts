import { Company } from '@modules/company/infra/typeorm/entities/Company';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';

export class ListCompanyService {
  constructor(private companyRepository: ICompanyRepository) {}

  public async execute(): Promise<Company[]> {
    return await this.companyRepository.findAll();
  }
}
