import { Router } from 'express';

import devRouter from './dev.routes';

const router = Router();

router.use(devRouter);

export default router;
