import { Router } from 'express';
import APIRoutes from './routing/api/api.routing';

const router = Router();
router.use('/api', APIRoutes);

export default router;