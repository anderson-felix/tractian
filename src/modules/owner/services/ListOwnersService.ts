import { Owner } from '../infra/typeorm/entities/Owner';
import IOwnerRepository from '../repositories/IOwnerRepository';

export class ListOwnersService {
  constructor(private ownerRepository: IOwnerRepository) {}

  public async execute(): Promise<Owner[]> {
    return await this.ownerRepository.findAll();
  }
}
