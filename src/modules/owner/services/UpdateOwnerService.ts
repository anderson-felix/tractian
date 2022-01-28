import { LocaleError } from '@shared/errors/LocaleError';
import { Address, Phone } from '@shared/interfaces';
import { updateEntity } from '@shared/utils/updateEntity';
import IOwnerRepository from '../repositories/IOwnerRepository';
import { Owner } from '../infra/typeorm/entities/Owner';

interface IRequest {
  id: string;
  name?: string;
  address?: Address;
  phones?: Phone[];
}

export class UpdateOwnerService {
  constructor(private ownerRepository: IOwnerRepository) {}

  public async execute({ id, ...data }: IRequest): Promise<Owner> {
    const owner = await this.ownerRepository.findById(id);
    if (!owner) throw new LocaleError('ownerNotFound');

    updateEntity(owner, data);

    return await this.ownerRepository.save(owner);
  }
}
