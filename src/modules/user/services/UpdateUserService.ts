import IUserRepository from '@modules/user/repositories/IUserRepository';

import { User } from '@modules/user/infra/typeorm/entities/User';
import { RoleTypes } from '@modules/user/interfaces/RoleTypes';
import { LocaleError } from '@shared/errors/LocaleError';
import { Address, Phone } from '@shared/interfaces';
import { updateEntity } from '@shared/utils/updateEntity';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  avatar?: string | null;
  role?: RoleTypes;
  federal_document?: string;
  phones?: Phone[];
  address?: Address;
}

export class UpdateUserService {
  constructor(
    private userRepository: IUserRepository,
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, ...data }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new LocaleError('userNotFound');

    if (data.email) {
      const userSameEmail = await this.userRepository.findByEmail(data.email);
      if (userSameEmail) throw new LocaleError('emailAlreadyExists');
    }

    if (user.avatar && data.avatar !== undefined)
      await this.storageProvider.deleteFile({ fileName: user.avatar });

    updateEntity(user, data);

    return await this.userRepository.save(user);
  }
}
