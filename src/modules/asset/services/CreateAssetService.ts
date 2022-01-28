import IAssetRepository from '@modules/asset/repositories/IAssetRepository';
import IOwnerRepository from '@modules/owner/repositories/IOwnerRepository';
import IUnitRepository from '@modules/unit/repositories/IUnitRepository';
import { LocaleError } from '@shared/errors/LocaleError';
import { Asset } from '../infra/typeorm/entities/Asset';

interface IRequest {
  name: string;
  description: string;
  image: string | null;
  owner_ids: string[] | null;
  model: string;
  unit_id: string;
}

export class CreateAssetService {
  constructor(
    private assetRepository: IAssetRepository,
    private unitRepository: IUnitRepository,
    private ownerRepository: IOwnerRepository,
  ) {}

  public async execute(data: IRequest): Promise<Asset> {
    const unit = await this.unitRepository.findById(data.unit_id);
    if (!unit) throw new LocaleError('unitNotFound');

    if (data.owner_ids) {
      const owners = await this.ownerRepository.findByIds(data.owner_ids);
      if (owners.length !== data.owner_ids.length)
        throw new LocaleError('ownerNotFound');
    }

    return await this.assetRepository.create({
      ...data,
      status: 'stopped',
      health: 0,
    });
  }
}
