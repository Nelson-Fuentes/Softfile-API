import { Router } from 'express';
import ImageRouting from './img.routing';

const router = Router();
router.use('/img', ImageRouting);

export default router;