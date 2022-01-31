import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import { GetFileLinkParams } from '@shared/providers/StorageProvider/interfaces';
import { LocaleError } from '@shared/errors/LocaleError';

export default class GetFileLinkService {
  constructor(private storageProvider: IStorageProvider) {}

  public async execute(data: GetFileLinkParams): Promise<string> {
    if (!data.key) throw new LocaleError('operationNotPermitted');

    return await this.storageProvider.getFileLink(data);
  }
}
