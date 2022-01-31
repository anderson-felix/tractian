import uploadConfig from '@config/upload';
import DiskStorageProvider from './DiskStorageProvider';
import S3StorageProvider from './S3StorageProvider';

const StorageProvider =
  uploadConfig.driver === 's3' ? S3StorageProvider : DiskStorageProvider;

export default StorageProvider;
