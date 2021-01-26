import { Router } from 'express';
import UserRoutes from './user.routing';
import EmailRoutes from './email.routing';

const router = Router();


router.use("/user", UserRoutes);
router.use("/email", EmailRoutes);

export default router;