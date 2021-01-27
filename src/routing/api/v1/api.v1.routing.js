import { Router } from 'express';
import UserRoutes from './user.routing';
import EmailRoutes from './email.routing';
import AuthRoutes from './auth.routing';

const router = Router();


router.use("/user", UserRoutes);
router.use("/email", EmailRoutes);
router.use("/auth", AuthRoutes);

export default router;