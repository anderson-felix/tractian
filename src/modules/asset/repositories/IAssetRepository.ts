import { ObjectID } from 'typeorm';
import ICreateAssetDTO from '../dtos/ICreateAssetDTO';
import { Asset } from '../infra/typeorm/entities/Asset';

export default interface IAssetRepository {
  create(data: ICreateAssetDTO): Promise<Asset>;
  save(data: Asset): Promise<Asset>;
  saveMany(data: Asset[]): Promise<void>;
  findAll(): Promise<Asset[]>;
  findAllByUnitName(name: string): Promise<Asset[]>;
  findById(id: ObjectID | string): Promise<Asset | undefined>;
  findByIdWithDeleted(id: ObjectID | string): Promise<Asset | undefined>;
  delete(data: Asset): Promise<void>;
  deleteMany(data: Asset[]): Promise<void>;
}
