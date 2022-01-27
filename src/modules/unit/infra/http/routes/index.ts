import { Router } from 'express';

import unitRouter from './unit.routes';

const router = Router();

router.use(unitRouter);

export default router;
