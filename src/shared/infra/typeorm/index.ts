import { logger } from '@shared/utils';
import { createConnections } from 'typeorm';

try {
  createConnections();
  logger.info(`Mongo successfully connected`);
} catch (err: any) {
  logger.error(`Mongo connection failed ${err.message}`);
}
