import { Company } from '@modules/company/infra/typeorm/entities/Company';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import IUnitRepository from '@modules/unit/repositories/IUnitRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';
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
  constructor(
    private companyRepository: ICompanyRepository,
    private userRepository: IUserRepository,
    private unitRepository: IUnitRepository, // private assetRepository: IAssetRepository,
  ) {}

  public async execute({ id, ...data }: IRequest): Promise<Company> {
    const company = await this.companyRepository.findById(id);
    if (!company) throw new LocaleError('companyNotFound');

    updateEntity(company, data);

    const [response, users, units] = await Promise.all([
      this.companyRepository.save(company),
      this.userRepository.findAllByCompanyName(company.name),
      this.unitRepository.findAllByCompanyName(company.name),
    ]);

    [...units, ...users].forEach(item => {
      item.company = company;
    });

    await Promise.all([
      this.userRepository.saveMany(users),
      this.unitRepository.saveMany(units),
    ]);

    return response;
  }
}
