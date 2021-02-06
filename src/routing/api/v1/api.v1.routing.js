import { Router } from 'express';
import UserRoutes from './user.routing';
import EmailRoutes from './email.routing';
import AuthRoutes from './auth.routing';
import ProfileRoutes from './profile.routing';

const router = Router();


router.use("/user", UserRoutes);
router.use("/email", EmailRoutes);
router.use("/auth", AuthRoutes);
router.use('/profile', ProfileRoutes)

export default router;