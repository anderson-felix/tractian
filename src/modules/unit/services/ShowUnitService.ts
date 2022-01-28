import { Asset } from '@modules/asset/infra/typeorm/entities/Asset';
import IAssetRepository from '@modules/asset/repositories/IAssetRepository';
import { Company } from '@modules/company/infra/typeorm/entities/Company';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import { LocaleError } from '@shared/errors/LocaleError';
import { Unit } from '../infra/typeorm/entities/Unit';
import IUnitRepository from '../repositories/IUnitRepository';

interface IResponse extends Unit {
  company: Company;
  assets: Asset[];
}

export class ShowUnitService {
  constructor(
    private unitRepository: IUnitRepository,
    private companyRepository: ICompanyRepository,
    private assetRepository: IAssetRepository,
  ) {}

  public async execute(id: string): Promise<IResponse> {
    const unit = await this.unitRepository.findById(id);
    if (!unit) throw new LocaleError('unitNotFound');

    const company = await this.companyRepository.findById(unit.company_id);
    if (!company) throw new LocaleError('companyNotFound');

    const assets = await this.assetRepository.findByUnitId(unit.id);

    const response = { ...unit, company, assets };

    return response;
  }
}
