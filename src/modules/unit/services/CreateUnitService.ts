import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import { LocaleError } from '@shared/errors/LocaleError';
import ICreateUnitDTO from '../dtos/ICreateUnitDTO';
import { Unit } from '../infra/typeorm/entities/Unit';
import IUnitRepository from '../repositories/IUnitRepository';

export class CreateUnitService {
  constructor(
    private companyRepository: ICompanyRepository,
    private unitRepository: IUnitRepository,
  ) {}

  public async execute(data: ICreateUnitDTO): Promise<Unit> {
    const company = await this.companyRepository.findById(data.company_id);
    if (!company) throw new LocaleError('companyNotFound');

    return await this.unitRepository.create(data);
  }
}
