import { Company } from '@modules/company/infra/typeorm/entities/Company';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import { LocaleError } from '@shared/errors/LocaleError';
import { Address } from '@shared/interfaces';
import { updateEntity } from '@shared/utils/updateEntity';

interface IRequest {
  id: string;
  federal_document?: string;
  name?: string;
  address?: Address;
}

export class UpdateCompanyService {
  constructor(private companyRepository: ICompanyRepository) {}

  public async execute({ id, ...data }: IRequest): Promise<Company> {
    const company = await this.companyRepository.findById(id);
    if (!company) throw new LocaleError('companyNotFound');

    updateEntity(company, data);

    return await this.companyRepository.save(company);
  }
}
