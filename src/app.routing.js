import { Router } from 'express';
import APIRoutes from './routing/api/api.routing';
import AssetsRoutes from './routing/assets/assets.routing';

const router = Router();
router.use('/api', APIRoutes);
router.use('/assets', AssetsRoutes);

export default router;