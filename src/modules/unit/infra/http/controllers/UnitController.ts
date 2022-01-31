import { Request, Response } from 'express';

import {
  CreateUnitService,
  ShowUnitService,
  ListUnitsService,
  ListUnitsByCompanyService,
  UpdateUnitService,
  DeleteUnitService,
} from '@modules/unit/services';

import CompanyRepository from '@modules/company/infra/typeorm/repositories/CompanyRepository';
import UnitRepository from '@modules/unit/infra/typeorm/repositories/UnitRepository';
import AssetRepository from '@modules/asset/infra/typeorm/repositories/AssetRepository';
import StorageProvider from '@shared/providers/StorageProvider/implementations/StorageProvider';
import GetUploadLinkService from '@shared/services/Storage/GetUploadLinkService';

export default class UnitController {
  static async create(req: Request, res: Response): Promise<Response> {
    const createUnit = new CreateUnitService(
      new CompanyRepository(),
      new UnitRepository(),
    );

    const unit = await createUnit.execute({ ...req.body });

    return res.json(unit);
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const showUnit = new ShowUnitService(
      new UnitRepository(),
      new CompanyRepository(),
      new AssetRepository(),
    );

    const unit = await showUnit.execute(req.params.id);

    return res.json(unit);
  }

  static async list(req: Request, res: Response): Promise<Response> {
    const listUnits = new ListUnitsService(new UnitRepository());

    const units = await listUnits.execute();

    return res.json(units);
  }

  static async listByCompany(req: Request, res: Response): Promise<Response> {
    const listUnits = new ListUnitsByCompanyService(
      new UnitRepository(),
      new CompanyRepository(),
    );

    const units = await listUnits.execute(req.params.company_id);

    return res.json(units);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const updateUnit = new UpdateUnitService(
      new UnitRepository(),
      new StorageProvider(),
    );

    const unit = await updateUnit.execute({ ...req.body });

    return res.json(unit);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const deleteUnit = new DeleteUnitService(
      new UnitRepository(),
      new AssetRepository(),
      new StorageProvider(),
    );

    await deleteUnit.execute(req.params.id);

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
