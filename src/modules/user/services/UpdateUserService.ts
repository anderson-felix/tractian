import IUserRepository from '@modules/user/repositories/IUserRepository';

import { User } from '@modules/user/infra/typeorm/entities/User';
import { RoleTypes } from '@modules/user/interfaces/RoleTypes';
import { LocaleError } from '@shared/errors/LocaleError';
import { Address, Phone } from '@shared/interfaces';
import { updateEntity } from '@shared/utils/updateEntity';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  role?: RoleTypes;
  federal_document?: string;
  phones?: Phone[];
  address?: Address;
}

export class UpdateUserService {
  constructor(private userRepository: IUserRepository) {}

  public async execute({ id, ...data }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new LocaleError('userNotFound');

    if (data.email) {
      const userSameEmail = await this.userRepository.findByEmail(data.email);
      if (userSameEmail) throw new LocaleError('emailAlreadyExists');
    }

    updateEntity(user, data);

    return await this.userRepository.save(user);
  }
}
