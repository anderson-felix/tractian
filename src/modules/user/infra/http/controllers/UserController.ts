import { Request, Response } from 'express';

import {
  CreateUserService,
  DeleteUserService,
  ListUsersByCompanyService,
  ListUsersService,
  ShowUserService,
  UpdateUserService,
} from '@modules/user/services';

import CompanyRepository from '@modules/company/infra/typeorm/repositories/CompanyRepository';
import UserRepository from 'modules/user/infra/typeorm/repositories/UserRepository';
import GetUploadLinkService from '@shared/services/Storage/GetUploadLinkService';
import StorageProvider from '@shared/providers/StorageProvider/implementations/StorageProvider';

export default class UserController {
  static async create(req: Request, res: Response): Promise<Response> {
    const createUser = new CreateUserService(
      new UserRepository(),
      new CompanyRepository(),
    );

    const user = await createUser.execute({ ...req.body });

    return res.json(user);
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const showUser = new ShowUserService(new UserRepository());

    const user = await showUser.execute(req.params.id);

    return res.json(user);
  }

  static async list(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUsersService(new UserRepository());

    const users = await listUsers.execute();

    return res.json(users);
  }

  static async listByCompany(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListUsersByCompanyService(
      new UserRepository(),
      new CompanyRepository(),
    );

    const users = await listUsers.execute(req.params.company_id);

    return res.json(users);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const updateUser = new UpdateUserService(
      new UserRepository(),
      new StorageProvider(),
    );

    const user = await updateUser.execute({ ...req.body });

    return res.json(user);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const deleteUser = new DeleteUserService(
      new UserRepository(),
      new StorageProvider(),
    );

    await deleteUser.execute(req.params.id);

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
