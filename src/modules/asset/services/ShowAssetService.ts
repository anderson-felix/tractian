import { Owner } from '@modules/owner/infra/typeorm/entities/Owner';
import IOwnerRepository from '@modules/owner/repositories/IOwnerRepository';
import { Unit } from '@modules/unit/infra/typeorm/entities/Unit';
import IUnitRepository from '@modules/unit/repositories/IUnitRepository';
import { LocaleError } from '@shared/errors/LocaleError';
import { Asset } from '../infra/typeorm/entities/Asset';
import IAssetRepository from '../repositories/IAssetRepository';

interface IResponse extends Asset {
  owners?: Owner[];
  unit: Unit;
}
export class ShowAssetService {
  constructor(
    private assetRepository: IAssetRepository,
    private unitRepository: IUnitRepository,
    private ownerRepository: IOwnerRepository,
  ) {}

  public async execute(id: string): Promise<IResponse> {
    const asset = await this.assetRepository.findById(id);
    if (!asset) throw new LocaleError('assetNotFound');

    const unit = await this.unitRepository.findById(asset.unit_id);
    if (!unit) throw new LocaleError('unitNotFound');

    const response = { ...asset, unit };

    if (asset.owner_ids) {
      const owners = await this.ownerRepository.findByIds(asset.owner_ids);
      Object.assign(response, { owners });
    }

    return response;
  }
}
