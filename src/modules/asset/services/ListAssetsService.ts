import { Asset } from '../infra/typeorm/entities/Asset';
import IAssetRepository from '../repositories/IAssetRepository';

export class ListAssetsService {
  constructor(private assetRepository: IAssetRepository) {}

  public async execute(): Promise<Asset[]> {
    return await this.assetRepository.findAll();
  }
}
