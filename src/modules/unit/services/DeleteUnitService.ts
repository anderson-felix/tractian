import AssetRepository from '@modules/asset/infra/typeorm/repositories/AssetRepository';
import IAssetRepository from '@modules/asset/repositories/IAssetRepository';
import { DeleteAssetService } from '@modules/asset/services';
import { LocaleError } from '@shared/errors/LocaleError';
import StorageProvider from '@shared/providers/StorageProvider/implementations/StorageProvider';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import { getFileNameFromUrl } from '@shared/utils/getFileNameFromUrl';
import { ObjectID } from 'typeorm';
import { Unit } from '../infra/typeorm/entities/Unit';
import IUnitRepository from '../repositories/IUnitRepository';

export class DeleteUnitService {
  constructor(
    private unitRepository: IUnitRepository,
    private assetRepository: IAssetRepository,
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(id: string | ObjectID, _unit?: Unit): Promise<void> {
    const unit = _unit || (await this.unitRepository.findById(id));
    if (!unit) throw new LocaleError('unitNotFound');

    if (unit.picture) {
      await this.storageProvider.deleteFile({
        fileName: getFileNameFromUrl(unit.picture),
      });
    }

    const assets = await this.assetRepository.findByUnitId(unit.id.toString());

    await Promise.all([
      this.unitRepository.delete(unit),
      ...assets.map(asset =>
        new DeleteAssetService(
          new AssetRepository(),
          new StorageProvider(),
        ).execute(asset.id, asset),
      ),
    ]);
  }
}
