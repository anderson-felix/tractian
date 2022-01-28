import { LocaleError } from '@shared/errors/LocaleError';
import { Owner } from '../infra/typeorm/entities/Owner';
import IOwnerRepository from '../repositories/IOwnerRepository';

export class ShowOwnerService {
  constructor(private ownerRepository: IOwnerRepository) {}

  public async execute(id: string): Promise<Owner> {
    const owner = await this.ownerRepository.findById(id);
    if (!owner) throw new LocaleError('ownerNotFound');
    return owner;
  }
}
