import 'dotenv/config';
import 'express-async-errors';
import '@shared/infra/typeorm';

import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import { logger } from '@shared/utils';
import routes from './routes';
import { getClientLanguage } from './middlewares/getClientLanguage';
import { errorHandler } from './middlewares/errorHandler';

const PORT = process.env.PORT || 3333;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use(getClientLanguage);
server.use(routes);
server.use(errors());
server.use(errorHandler);

server.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
