import IUserRepository from '@modules/user/repositories/IUserRepository';

import { LocaleError } from '@shared/errors/LocaleError';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import { getFileNameFromUrl } from '@shared/utils/getFileNameFromUrl';
import { ObjectID } from 'typeorm';
import { User } from '../infra/typeorm/entities/User';

export class DeleteUserService {
  constructor(
    private userRepository: IUserRepository,
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(id: string | ObjectID, _user?: User): Promise<void> {
    const user = _user || (await this.userRepository.findById(id));
    if (!user) throw new LocaleError('userNotFound');

    if (user.avatar)
      await this.storageProvider.deleteFile({
        fileName: getFileNameFromUrl(user.avatar),
      });

    await this.userRepository.delete(user);
  }
}
