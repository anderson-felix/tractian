import fs from 'fs';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime-types';

import { generateFileName } from '@shared/utils/generateFileName';
import IStorageProvider from '../models/IStorageProvider';
import {
  FileDeleteParams,
  FileUploadParams,
  GetFileLinkParams,
  GetUploadLinkParams,
  UploadLinkResponse,
} from '../interfaces';

export default class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_REGION,
      signatureVersion: 'v4',
      apiVersion: '2006-03-01',
    });
    aws.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  public async getUploadLink({
    mime_type,
    file_name,
  }: GetUploadLinkParams): Promise<UploadLinkResponse> {
    try {
      const bucket = `${process.env.AWS_S3_BUCKET}`;

      const ext = mime.extension(mime_type) || '';

      const key = generateFileName({ fileName: file_name, ext });

      const params = {
        Bucket: bucket,
        Key: `${key}`,
        ACL: 'public-read',
        ContentType: mime_type,
      };

      const link = this.client.getSignedUrl('putObject', params);

      return { link, path: key };
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async getFileLink({ key }: GetFileLinkParams): Promise<string> {
    try {
      const bucket = `${process.env.AWS_S3_BUCKET}`;

      const params = {
        Bucket: bucket,
        Key: key,
      };

      const url = this.client.getSignedUrl('getObject', params);

      return url;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async saveFile({
    fileName,
    filePath,
    mimeType,
  }: FileUploadParams): Promise<string> {
    try {
      const bucket = `${process.env.AWS_S3_BUCKET}`;

      const fileContent = fs.readFileSync(filePath);

      const params = {
        Bucket: bucket,
        Key: fileName,
        Body: fileContent,
        ACL: 'public-read',
        ContentType: mimeType,
      };

      const data = await this.client.upload(params).promise();

      return data.Location;
    } catch (err: any) {
      throw new Error(err);
    } finally {
      await fs.promises.unlink(filePath);
    }
  }

  public async deleteFile({ fileName }: FileDeleteParams): Promise<void> {
    try {
      const bucket = `${process.env.AWS_S3_BUCKET}`;

      await this.client
        .deleteObject({
          Bucket: bucket,
          Key: fileName,
        })
        .promise();
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
