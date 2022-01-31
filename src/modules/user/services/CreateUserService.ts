import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';

import { User } from '@modules/user/infra/typeorm/entities/User';
import { RoleTypes } from '@modules/user/interfaces/RoleTypes';
import { LocaleError } from '@shared/errors/LocaleError';
import { Address, Phone } from '@shared/interfaces';

interface IRequest {
  company_id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: RoleTypes;
  federal_document: string | null;
  phones: Phone[] | null;
  address: Address | null;
}

export class CreateUserService {
  constructor(
    private userRepository: IUserRepository,
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(data: IRequest): Promise<User> {
    const userSameEmail = await this.userRepository.findByEmail(data.email);
    if (userSameEmail) throw new LocaleError('emailAlreadyExists');

    const company = await this.companyRepository.findById(data.company_id);
    if (!company) throw new LocaleError('companyNotFound');

    return await this.userRepository.create(data);
  }
}
