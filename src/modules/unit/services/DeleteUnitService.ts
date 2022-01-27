import IAssetRepository from '@modules/asset/repositories/IAssetRepository';
import { LocaleError } from '@shared/errors/LocaleError';
import IUnitRepository from '../repositories/IUnitRepository';

export class DeleteUnitService {
  constructor(
    private unitRepository: IUnitRepository,
    private assetRepository: IAssetRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const unit = await this.unitRepository.findById(id);
    if (!unit) throw new LocaleError('unitNotFound');

    await this.unitRepository.delete(unit);

    const [, assets] = await Promise.all([
      this.unitRepository.delete(unit),
      this.assetRepository.findAllByUnitName(unit.name),
    ]);

    await this.assetRepository.deleteMany(assets);
  }
}
