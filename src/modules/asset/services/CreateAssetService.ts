import IAssetRepository from '@modules/asset/repositories/IAssetRepository';
import IUnitRepository from '@modules/unit/repositories/IUnitRepository';
import { LocaleError } from '@shared/errors/LocaleError';
import { Asset } from '../infra/typeorm/entities/Asset';

interface IRequest {
  name: string;
  description: string;
  image: string | null;
  owner: string | null;
  model: string;
  unit_id: string;
}

export class CreateAssetService {
  constructor(
    private assetRepository: IAssetRepository,
    private unitRepository: IUnitRepository,
  ) {}

  public async execute({ unit_id, ...data }: IRequest): Promise<Asset> {
    const unit = await this.unitRepository.findById(unit_id);
    if (!unit) throw new LocaleError('unitNotFound');

    return await this.assetRepository.create({
      ...data,
      unit,
      status: 'stopped',
      health: 0,
    });
  }
}
