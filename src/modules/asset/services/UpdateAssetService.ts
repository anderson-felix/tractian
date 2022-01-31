import IOwnerRepository from '@modules/owner/repositories/IOwnerRepository';
import { LocaleError } from '@shared/errors/LocaleError';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import { getFileNameFromUrl } from '@shared/utils/getFileNameFromUrl';
import { updateEntity } from '@shared/utils/updateEntity';
import { ObjectID } from 'typeorm';
import { Asset } from '../infra/typeorm/entities/Asset';
import { AssetStatusType } from '../interfaces/AssetStatusType';
import IAssetRepository from '../repositories/IAssetRepository';

interface IRequest {
  id: ObjectID;
  name?: string;
  description?: string;
  model?: string;
  image?: string | null;
  status?: AssetStatusType;
  health?: number;
  owner_ids?: ObjectID[];
}

export class UpdateAssetService {
  constructor(
    private assetRepository: IAssetRepository,
    private ownerRepository: IOwnerRepository,
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, ...data }: IRequest): Promise<Asset> {
    const asset = await this.assetRepository.findById(id);
    if (!asset) throw new LocaleError('assetNotFound');

    if (data.health && (data.health > 100 || data.health < 0))
      throw new LocaleError('healthInvalid');

    if (data.owner_ids) {
      const owners = await this.ownerRepository.findByIds(data.owner_ids);
      if (owners.length !== data.owner_ids.length)
        throw new LocaleError('ownerNotFound');
    }

    if (asset.image && data.image !== undefined)
      await this.storageProvider.deleteFile({
        fileName: getFileNameFromUrl(asset.image),
      });

    updateEntity(asset, data);

    return await this.assetRepository.save(asset);
  }
}
