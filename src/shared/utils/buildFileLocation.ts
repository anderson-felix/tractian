import uploadConfig from '@config/upload';

type FuncType = (uri: string) => string;

export const buildFileLocation: FuncType = uri =>
  uploadConfig.urls[uploadConfig.driver]?.concat(`/${uri}`);
