import { Address, Phone } from '@shared/interfaces';
import { Owner } from '../infra/typeorm/entities/Owner';
import IOwnerRepository from '../repositories/IOwnerRepository';

interface IRequest {
  name: string;
  address: Address;
  phones?: Phone[];
}

export class CreateOwnerService {
  constructor(private ownerRepository: IOwnerRepository) {}

  public async execute(data: IRequest): Promise<Owner> {
    return await this.ownerRepository.create(data);
  }
}
