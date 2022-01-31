import { LocaleError } from '@shared/errors/LocaleError';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import { getFileNameFromUrl } from '@shared/utils/getFileNameFromUrl';
import { ObjectID } from 'typeorm';
import { Asset } from '../infra/typeorm/entities/Asset';
import IAssetRepository from '../repositories/IAssetRepository';

export class DeleteAssetService {
  constructor(
    private assetRepository: IAssetRepository,
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(id: ObjectID | string, _asset?: Asset): Promise<void> {
    const asset = _asset || (await this.assetRepository.findById(id));

    if (!asset) throw new LocaleError('assetNotFound');

    if (asset.image) {
      await this.storageProvider.deleteFile({
        fileName: getFileNameFromUrl(asset.image),
      });
    }

    await this.assetRepository.delete(asset);
  }
}
