import { FileDeleteParams } from './FileDeleteParams';

export interface FileUploadParams extends FileDeleteParams {
  filePath: string;
  mimeType: string;
}
