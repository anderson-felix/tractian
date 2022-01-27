import IUserRepository from '@modules/user/repositories/IUserRepository';

import { User } from '@modules/user/infra/typeorm/entities/User';
import { LocaleError } from '@shared/errors/LocaleError';

export class ShowUserService {
  constructor(private userRepository: IUserRepository) {}

  public async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new LocaleError('userNotFound');
    return user;
  }
}
