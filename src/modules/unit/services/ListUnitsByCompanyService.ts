import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import { LocaleError } from '@shared/errors/LocaleError';
import { Unit } from '../infra/typeorm/entities/Unit';
import IUnitRepository from '../repositories/IUnitRepository';

export class ListUnitsByCompanyService {
  constructor(
    private unitRepository: IUnitRepository,
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(companyId: string): Promise<Unit[]> {
    const company = await this.companyRepository.findById(companyId);
    if (!company) throw new LocaleError('companyNotFound');

    return await this.unitRepository.findByCompanyId(companyId);
  }
}
