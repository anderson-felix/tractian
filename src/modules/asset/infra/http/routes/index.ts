import { Router } from 'express';

import assetRouter from './asset.routes';

const router = Router();

router.use(assetRouter);

export default router;
