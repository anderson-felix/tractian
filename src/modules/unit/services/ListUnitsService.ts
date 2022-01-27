import { Unit } from '../infra/typeorm/entities/Unit';
import IUnitRepository from '../repositories/IUnitRepository';

export class ListUnitsService {
  constructor(private unitRepository: IUnitRepository) {}

  public async execute(): Promise<Unit[]> {
    return await this.unitRepository.findAll();
  }
}
