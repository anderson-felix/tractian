import path from 'path';

import {
  GetUploadLinkParams,
  UploadLinkResponse,
} from '@shared/providers/StorageProvider/interfaces';
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import { LocaleError } from '@shared/errors/LocaleError';

export default class GetUploadLinkService {
  constructor(private storageProvider: IStorageProvider) {}

  public async execute(data: GetUploadLinkParams): Promise<UploadLinkResponse> {
    if (!data.file_name) throw new LocaleError('fileNameRequired');
    if (!data.mime_type) throw new LocaleError('contentTypeRequired');

    data.file_name = path.parse(data.file_name).name.replace(/\s/g, '');

    return await this.storageProvider.getUploadLink(data);
  }
}
