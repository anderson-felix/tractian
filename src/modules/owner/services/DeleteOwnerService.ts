import { LocaleError } from '@shared/errors/LocaleError';
import { ObjectID } from 'typeorm';
import { Owner } from '../infra/typeorm/entities/Owner';
import IOwnerRepository from '../repositories/IOwnerRepository';

export class DeleteOwnerService {
  constructor(private ownerRepository: IOwnerRepository) {}

  public async execute(id: ObjectID | string, _owner?: Owner): Promise<void> {
    const owner = _owner || (await this.ownerRepository.findById(id));
    if (!owner) throw new LocaleError('ownerNotFound');

    await this.ownerRepository.delete(owner);
  }
}
