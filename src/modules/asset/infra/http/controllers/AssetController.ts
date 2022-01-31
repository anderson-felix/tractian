import { Request, Response } from 'express';

import {
  CreateAssetService,
  ShowAssetService,
  ListAssetsService,
  ListAssetsByUnitService,
  UpdateAssetService,
  DeleteAssetService,
} from '@modules/asset/services';

import AssetRepository from '@modules/asset/infra/typeorm/repositories/AssetRepository';
import UnitRepository from '@modules/unit/infra/typeorm/repositories/UnitRepository';
import OwnerRepository from '@modules/owner/infra/typeorm/repositories/OwnerRepository';
import StorageProvider from '@shared/providers/StorageProvider/implementations/StorageProvider';
import GetUploadLinkService from '@shared/services/Storage/GetUploadLinkService';

export default class AssetController {
  static async create(req: Request, res: Response): Promise<Response> {
    const createAsset = new CreateAssetService(
      new AssetRepository(),
      new UnitRepository(),
      new OwnerRepository(),
    );

    const asset = await createAsset.execute({ ...req.body });

    return res.json(asset);
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const showAsset = new ShowAssetService(
      new AssetRepository(),
      new UnitRepository(),
      new OwnerRepository(),
    );

    const asset = await showAsset.execute(req.params.id);

    return res.json(asset);
  }

  static async list(req: Request, res: Response): Promise<Response> {
    const listAssets = new ListAssetsService(new AssetRepository());

    const assets = await listAssets.execute();

    return res.json(assets);
  }

  static async listByUnit(req: Request, res: Response): Promise<Response> {
    const listAssets = new ListAssetsByUnitService(
      new UnitRepository(),
      new AssetRepository(),
    );

    const asset = await listAssets.execute(req.params.unit_id);

    return res.json(asset);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const updateAsset = new UpdateAssetService(
      new AssetRepository(),
      new OwnerRepository(),
      new StorageProvider(),
    );

    const asset = await updateAsset.execute({ ...req.body });

    return res.json(asset);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const deleteAsset = new DeleteAssetService(
      new AssetRepository(),
      new StorageProvider(),
    );

    await deleteAsset.execute(req.params.id);

    return res.status(204).send();
  }

  static async uploadLink(req: Request, res: Response): Promise<Response> {
    const getUploadLink = new GetUploadLinkService(new StorageProvider());
    const { mime_type, file_name } = req.query;

    const uploadLink = await getUploadLink.execute({
      mime_type: mime_type as string,
      file_name: file_name as string,
    });

    return res.json(uploadLink);
  }
}
