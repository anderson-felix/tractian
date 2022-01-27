import IUserRepository from '@modules/user/repositories/IUserRepository';

import { LocaleError } from '@shared/errors/LocaleError';

export class DeleteUserService {
  constructor(private userRepository: IUserRepository) {}

  public async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new LocaleError('emailAlreadyExists');

    await this.userRepository.delete(user);
  }
}
