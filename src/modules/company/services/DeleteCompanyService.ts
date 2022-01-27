import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import IUnitRepository from '@modules/unit/repositories/IUnitRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import { LocaleError } from '@shared/errors/LocaleError';

export class DeleteCompanyService {
  constructor(
    private companyRepository: ICompanyRepository,
    private userRepository: IUserRepository,
    private unitRepository: IUnitRepository, // private assetRepository: IAssetRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const company = await this.companyRepository.findById(id);
    if (!company) throw new LocaleError('companyNotFound');

    const [, users, units] = await Promise.all([
      this.companyRepository.delete(company),
      this.userRepository.findAllByCompanyName(company.name),
      this.unitRepository.findAllByCompanyName(company.name),
    ]);

    await Promise.all([
      this.userRepository.deleteMany(users),
      this.unitRepository.deleteMany(units),
    ]);
  }
}
