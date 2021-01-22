import { Router } from 'express';
import APIRoutingVersion1 from './v1/api.v1.routing';

const router = Router();
router.use('/v1', APIRoutingVersion1);

export default router;