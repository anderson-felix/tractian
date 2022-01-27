import { Router } from 'express';

import companyRoutes from '@modules/company/infra/http/routes';
import userRoutes from '@modules/user/infra/http/routes';
import unitRoutes from '@modules/unit/infra/http/routes';
import assetRoutes from '@modules/asset/infra/http/routes';

const router = Router();

router.use('/company', companyRoutes);
router.use('/user', userRoutes);
router.use('/unit', unitRoutes);
router.use('/asset', assetRoutes);

export default router;
