import { MongoRepository, getMongoRepository } from 'typeorm';
import { isValidObjectId } from 'mongoose';

import IAssetRepository from '@modules/asset/repositories/IAssetRepository';
import ICreateAssetDTO from '@modules/asset/dtos/ICreateAssetDTO';
import { Asset } from '../entities/Asset';

export default class AssetRepository implements IAssetRepository {
  private repository: MongoRepository<Asset>;

  constructor() {
    this.repository = getMongoRepository(Asset);
  }

  public async create(data: ICreateAssetDTO) {
    const asset = this.repository.create(data);

    return await this.repository.save(asset);
  }

  public async save(data: Asset) {
    return await this.repository.save(data);
  }

  public async saveMany(assets: Asset[]) {
    await Promise.all(
      assets.map(asset => this.repository.update(asset.id, asset)),
    );
  }

  public async findAll() {
    return await this.repository.find({ where: { deleted_at: null } });
  }

  public async findAllByUnitName(name: string) {
    return await this.repository.find({
      where: { 'unit.name': { $eq: name } },
    });
  }

  public async findByUnitId(unit_id: string) {
    return await this.repository.find({
      where: { unit_id: { $eq: unit_id } },
    });
  }

  public async findById(id: string) {
    return id && isValidObjectId(id)
      ? await this.repository.findOne(id, {
          where: { deleted_at: null },
        })
      : undefined;
  }

  public async findByIdWithDeleted(id: string) {
    return id && isValidObjectId(id)
      ? await this.repository.findOne(id)
      : undefined;
  }

  public async delete(asset: Asset) {
    await this.repository.delete(asset.id);
  }

  public async deleteByUnitId(unit_id: string) {
    const assets = await this.repository.find({
      where: { unit_id: { $eq: unit_id } },
    });

    await this.repository.deleteMany(assets);
  }

  public async deleteMany(assets: Asset[]) {
    await this.repository.deleteMany(assets);
  }
}
