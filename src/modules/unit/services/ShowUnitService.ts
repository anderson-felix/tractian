import { LocaleError } from '@shared/errors/LocaleError';
import { Unit } from '../infra/typeorm/entities/Unit';
import IUnitRepository from '../repositories/IUnitRepository';

export class ShowUnitService {
  constructor(private unitRepository: IUnitRepository) {}

  public async execute(id: string): Promise<Unit> {
    const unit = await this.unitRepository.findById(id);

    if (!unit) throw new LocaleError('unitNotFound');
    return unit;
  }
}
