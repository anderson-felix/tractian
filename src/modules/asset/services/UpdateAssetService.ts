import IOwnerRepository from '@modules/owner/repositories/IOwnerRepository';
import { LocaleError } from '@shared/errors/LocaleError';
import { updateEntity } from '@shared/utils/updateEntity';
import { Asset } from '../infra/typeorm/entities/Asset';
import { AssetStatusType } from '../interfaces/AssetStatusType';
import IAssetRepository from '../repositories/IAssetRepository';

interface IRequest {
  id: string;
  name?: string;
  description?: string;
  model?: string;
  image?: string;
  status?: AssetStatusType;
  health?: number;
  owner_ids?: string[];
}

export class UpdateAssetService {
  constructor(
    private assetRepository: IAssetRepository,
    private ownerRepository: IOwnerRepository,
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

    if (asset.image && data.image) {
      // TODO: remove images on storage driver
    }

    updateEntity(asset, data);

    return await this.assetRepository.save(asset);
  }
}
