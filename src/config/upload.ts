import path from 'path';

type DriverTypes = 's3' | 'disk';

type UrlTypes = { s3: string; disk: string };

interface UploadConfig {
  driver: DriverTypes;
  directory: string;
  urls: UrlTypes;
}

export default {
  driver: process.env.STORAGE_DRIVER?.toLowerCase() || 'disk',
  directory: path.resolve(__dirname, '..', '..', 'tmp'),
  urls: {
    s3: process.env.AWS_S3_URL,
    disk: process.env.LOCAL_URL?.concat(`:${process.env.PORT || 3333}`),
  },
} as UploadConfig;
