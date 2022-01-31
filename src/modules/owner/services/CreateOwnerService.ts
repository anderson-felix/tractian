import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import { LocaleError } from '@shared/errors/LocaleError';
import { Address, Phone } from '@shared/interfaces';
import { ObjectID } from 'typeorm';
import { Owner } from '../infra/typeorm/entities/Owner';
import IOwnerRepository from '../repositories/IOwnerRepository';

interface IRequest {
  name: string;
  address: Address;
  company_id: ObjectID;
  phones?: Phone[];
}

export class CreateOwnerService {
  constructor(
    private ownerRepository: IOwnerRepository,
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(data: IRequest): Promise<Owner> {
    const company = await this.companyRepository.findById(data.company_id);
    if (!company) throw new LocaleError('companyNotFound');

    return await this.ownerRepository.create(data);
  }
}
