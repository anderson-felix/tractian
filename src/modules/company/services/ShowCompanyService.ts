import { Company } from '@modules/company/infra/typeorm/entities/Company';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import { LocaleError } from '@shared/errors/LocaleError';

export class ShowCompanyService {
  constructor(private companyRepository: ICompanyRepository) {}

  public async execute(id: string): Promise<Company> {
    const company = await this.companyRepository.findById(id);

    if (!company) throw new LocaleError('companyNotFound');
    return company;
  }
}
