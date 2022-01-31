import { LocaleError } from '@shared/errors/LocaleError';
import { Address, Phone } from '@shared/interfaces';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import { getFileNameFromUrl } from '@shared/utils/getFileNameFromUrl';
import { updateEntity } from '@shared/utils/updateEntity';
import { Unit } from '../infra/typeorm/entities/Unit';
import IUnitRepository from '../repositories/IUnitRepository';

interface IRequest {
  id: string;
  picture?: string | null;
  name?: string;
  address?: Address;
  phones?: Phone[];
}

export class UpdateUnitService {
  constructor(
    private unitRepository: IUnitRepository,
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, ...data }: IRequest): Promise<Unit> {
    const unit = await this.unitRepository.findById(id);
    if (!unit) throw new LocaleError('unitNotFound');

    if (unit.picture && data.picture !== undefined) {
      await this.storageProvider.deleteFile({
        fileName: getFileNameFromUrl(unit.picture),
      });
    }

    updateEntity(unit, data);

    return await this.unitRepository.save(unit);
  }
}
