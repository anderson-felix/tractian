import { Request, Response } from 'express';

import {
  CreateOwnerService,
  DeleteOwnerService,
  ListOwnersService,
  ShowOwnerService,
  UpdateOwnerService,
} from '@modules/owner/services';

import OwnerRepository from '@modules/owner/infra/typeorm/repositories/OwnerRepository';
import CompanyRepository from '@modules/company/infra/typeorm/repositories/CompanyRepository';

export default class OwnerController {
  static async create(req: Request, res: Response): Promise<Response> {
    const createOwner = new CreateOwnerService(
      new OwnerRepository(),
      new CompanyRepository(),
    );

    const owner = await createOwner.execute({ ...req.body });

    return res.json(owner);
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const showOwner = new ShowOwnerService(new OwnerRepository());

    const owner = await showOwner.execute(req.params.id);

    return res.json(owner);
  }

  static async list(req: Request, res: Response): Promise<Response> {
    const listOwners = new ListOwnersService(new OwnerRepository());

    const owners = await listOwners.execute();

    return res.json(owners);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const updateOwner = new UpdateOwnerService(new OwnerRepository());

    const owner = await updateOwner.execute({ ...req.body });

    return res.json(owner);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const deleteOwner = new DeleteOwnerService(new OwnerRepository());

    await deleteOwner.execute(req.params.id);

    return res.status(204).send();
  }
}
