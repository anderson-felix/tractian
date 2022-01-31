import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

import uploadConfig from '@config/upload';
import { generateSecretKey } from '@shared/utils';
import { generateFileName } from '@shared/utils/generateFileName';
import IStorageProvider from '../models/IStorageProvider';
import {
  FileDeleteParams,
  FileUploadParams,
  GetFileLinkParams,
  GetUploadLinkParams,
  UploadLinkResponse,
} from '../interfaces';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile({ fileName }: FileUploadParams): Promise<string> {
    return `${process.env.APP_WEB_URL}/files/${fileName}`;
  }

  public async deleteFile({ fileName }: FileDeleteParams): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, fileName);
    await fs.promises.unlink(filePath);
  }

  public async getUploadLink({
    file_name,
    mime_type,
  }: GetUploadLinkParams): Promise<UploadLinkResponse> {
    const timestamp = Date.now();

    const ext = mime.extension(mime_type) || '';
    const key = generateFileName({ fileName: file_name, ext, timestamp });
    const secret = generateSecretKey(timestamp);
    const port = process.env.PORT || 3333;

    return {
      link: `http://localhost:${port}/dev/upload/${secret}?filename=${key}`,
      path: `files/${key}`,
    };
  }

  public async getFileLink({ key }: GetFileLinkParams): Promise<string> {
    return `${process.env.APP_WEB_URL}/files/${key}`;
  }
}

export default DiskStorageProvider;
