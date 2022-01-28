import IUnitRepository from '@modules/unit/repositories/IUnitRepository';
import { LocaleError } from '@shared/errors/LocaleError';
import { Asset } from '../infra/typeorm/entities/Asset';
import IAssetRepository from '../repositories/IAssetRepository';

export class ListAssetsByUnitService {
  constructor(
    private unitRepository: IUnitRepository,
    private assetRepository: IAssetRepository,
  ) {}

  public async execute(unitId: string): Promise<Asset[]> {
    const unit = await this.unitRepository.findById(unitId);
    if (!unit) throw new LocaleError('unitNotFound');

    return await this.assetRepository.findByUnitId(unit.id);
  }
}
