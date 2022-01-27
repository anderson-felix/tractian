import { Unit } from '@modules/unit/infra/typeorm/entities/Unit';
import { AssetStatusType } from '../interfaces/AssetStatusType';

export default interface ICreateAssetDTO {
  name: string;
  description: string;
  image: string | null;
  owner: string | null;
  model: string;
  status: AssetStatusType;
  health: number;
  unit: Unit;
}
