import { Request, Response } from 'express';

import CompanyRepository from '@modules/company/infra/typeorm/repositories/CompanyRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import UnitRepository from '@modules/unit/infra/typeorm/repositories/UnitRepository';

import {
  CreateCompanyService,
  ShowCompanyService,
  ListCompanyService,
  UpdateCompanyService,
  DeleteCompanyService,
} from '@modules/company/services';

export default class CompanyController {
  static async create(req: Request, res: Response): Promise<Response> {
    const createCompany = new CreateCompanyService(new CompanyRepository());

    const company = await createCompany.execute({ ...req.body });

    return res.json(company);
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const showCompany = new ShowCompanyService(
      new CompanyRepository(),
      new UserRepository(),
      new UnitRepository(),
    );

    const company = await showCompany.execute(req.params.id);

    return res.json(company);
  }

  static async list(req: Request, res: Response): Promise<Response> {
    const listCompanies = new ListCompanyService(new CompanyRepository());

    const company = await listCompanies.execute();

    return res.json(company);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const updateCompany = new UpdateCompanyService(new CompanyRepository());

    const company = await updateCompany.execute({ ...req.body });

    return res.json(company);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const deleteCompany = new DeleteCompanyService(
      new CompanyRepository(),
      new UserRepository(),
      new UnitRepository(),
    );

    await deleteCompany.execute(req.params.id);

    return res.status(204).send();
  }
}
