import { Router } from 'express';
import APIRoutes from './apps/api/api.routing';

const router = Router();
router.use('/api', APIRoutes);

export default router;