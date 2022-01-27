import { LocaleError } from '@shared/errors/LocaleError';
import { Asset } from '../infra/typeorm/entities/Asset';
import IAssetRepository from '../repositories/IAssetRepository';

export class ShowAssetService {
  constructor(private assetRepository: IAssetRepository) {}

  public async execute(id: string): Promise<Asset> {
    const asset = await this.assetRepository.findById(id);

    if (!asset) throw new LocaleError('assetNotFound');
    return asset;
  }
}
