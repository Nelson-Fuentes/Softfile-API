import { Router } from 'express';
import UserRoutes from './user.routing';
import EmailRoutes from './email.routing';
import AuthRoutes from './auth.routing';
import ProfileRoutes from './profile.routing';
import DegreeRoutes from './degree.routing'

const router = Router();


router.use("/user", UserRoutes);
router.use("/email", EmailRoutes);
router.use("/auth", AuthRoutes);
router.use('/profile', ProfileRoutes);
router.use('/degree', DegreeRoutes);

export default router;