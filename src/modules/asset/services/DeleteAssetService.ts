import { LocaleError } from '@shared/errors/LocaleError';
import IAssetRepository from '../repositories/IAssetRepository';

export class DeleteAssetService {
  constructor(private assetRepository: IAssetRepository) {}

  public async execute(id: string): Promise<void> {
    const asset = await this.assetRepository.findById(id);

    if (!asset) throw new LocaleError('assetNotFound');

    await this.assetRepository.delete(asset);
  }
}
