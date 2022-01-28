import { AssetStatusType } from '../interfaces/AssetStatusType';

export default interface ICreateAssetDTO {
  name: string;
  description: string;
  image: string | null;
  owner_ids: string[] | null;
  model: string;
  status: AssetStatusType;
  health: number;
  unit_id: string;
}
