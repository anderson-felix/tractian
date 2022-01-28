import { Company } from '@modules/company/infra/typeorm/entities/Company';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import { Unit } from '@modules/unit/infra/typeorm/entities/Unit';
import IUnitRepository from '@modules/unit/repositories/IUnitRepository';
import { User } from '@modules/user/infra/typeorm/entities/User';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import { LocaleError } from '@shared/errors/LocaleError';

interface IResponse extends Company {
  users: User[];
  units: Unit[];
}
export class ShowCompanyService {
  constructor(
    private companyRepository: ICompanyRepository,
    private userRepository: IUserRepository,
    private unitRepository: IUnitRepository, // private assetRepository: IAssetRepository,
  ) {}

  public async execute(id: string): Promise<IResponse> {
    const company = await this.companyRepository.findById(id);
    if (!company) throw new LocaleError('companyNotFound');

    const [users, units] = await Promise.all([
      this.userRepository.findByCompanyId(company.id),
      this.unitRepository.findByCompanyId(company.id),
    ]);

    return { ...company, units, users };
  }
}
