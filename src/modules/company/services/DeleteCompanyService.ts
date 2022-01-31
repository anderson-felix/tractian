import AssetRepository from '@modules/asset/infra/typeorm/repositories/AssetRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import OwnerRepository from '@modules/owner/infra/typeorm/repositories/OwnerRepository';
import IOwnerRepository from '@modules/owner/repositories/IOwnerRepository';
import { DeleteOwnerService } from '@modules/owner/services';
import UnitRepository from '@modules/unit/infra/typeorm/repositories/UnitRepository';
import IUnitRepository from '@modules/unit/repositories/IUnitRepository';
import { DeleteUnitService } from '@modules/unit/services';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import { DeleteUserService } from '@modules/user/services';
import { LocaleError } from '@shared/errors/LocaleError';
import StorageProvider from '@shared/providers/StorageProvider/implementations/StorageProvider';

export class DeleteCompanyService {
  constructor(
    private companyRepository: ICompanyRepository,
    private userRepository: IUserRepository,
    private unitRepository: IUnitRepository,
    private ownerRepository: IOwnerRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const company = await this.companyRepository.findById(id);
    if (!company) throw new LocaleError('companyNotFound');

    const [users, units, owners] = await Promise.all([
      this.userRepository.findByCompanyId(company.id.toString()),
      this.unitRepository.findByCompanyId(company.id.toString()),
      this.ownerRepository.findByCompanyId(company.id.toString()),
    ]);

    await Promise.all([
      this.companyRepository.delete(company),
      ...users.map(user =>
        new DeleteUserService(
          new UserRepository(),
          new StorageProvider(),
        ).execute(user.id, user),
      ),
      ...units.map(unit =>
        new DeleteUnitService(
          new UnitRepository(),
          new AssetRepository(),
          new StorageProvider(),
        ).execute(unit.id, unit),
      ),
      ...owners.map(owner =>
        new DeleteOwnerService(new OwnerRepository()).execute(owner.id, owner),
      ),
    ]);
  }
}
