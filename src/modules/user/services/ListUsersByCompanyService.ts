import IUserRepository from '@modules/user/repositories/IUserRepository';

import { User } from '@modules/user/infra/typeorm/entities/User';
import { LocaleError } from '@shared/errors/LocaleError';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';

export class ListUsersByCompanyService {
  constructor(
    private userRepository: IUserRepository,
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(companyId: string): Promise<User[]> {
    const company = await this.companyRepository.findById(companyId);
    if (!company) throw new LocaleError('companyNotFound');

    return await this.userRepository.findByCompanyId(companyId);
  }
}
