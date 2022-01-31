import { ObjectID } from 'typeorm';
import { AssetStatusType } from '../interfaces/AssetStatusType';

export default interface ICreateAssetDTO {
  name: string;
  description: string;
  image: string | null;
  owner_ids: ObjectID[] | null;
  model: string;
  status: AssetStatusType;
  health: number;
  unit_id: ObjectID;
}
