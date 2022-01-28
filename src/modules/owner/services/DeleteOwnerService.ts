import { LocaleError } from '@shared/errors/LocaleError';
import IOwnerRepository from '../repositories/IOwnerRepository';

export class DeleteOwnerService {
  constructor(private ownerRepository: IOwnerRepository) {}

  public async execute(id: string): Promise<void> {
    const owner = await this.ownerRepository.findById(id);
    if (!owner) throw new LocaleError('ownerNotFound');

    await this.ownerRepository.delete(owner);
  }
}
