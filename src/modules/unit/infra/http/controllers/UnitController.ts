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
    const updateUnit = new UpdateUnitService(new UnitRepository());

    const unit = await updateUnit.execute({ ...req.body });

    return res.json(unit);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const deleteUnit = new DeleteUnitService(
      new UnitRepository(),
      new AssetRepository(),
    );

    await deleteUnit.execute(req.params.id);

    return res.status(204).send();
  }
}
