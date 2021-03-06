import { Router } from 'express';
import UserRoutes from './user.routing';
import EmailRoutes from './email.routing';
import AuthRoutes from './auth.routing';
import ProfileRoutes from './profile.routing';
import DegreeRoutes from './degree.routing';
import LocationRoutes from './location.routing';
import PhoneRoutes from './phone.routing'
import SocialRoutes from './social.routing';

const router = Router();


router.use("/user", UserRoutes);
router.use("/email", EmailRoutes);
router.use("/auth", AuthRoutes);
router.use('/profile', ProfileRoutes);
router.use('/degree', DegreeRoutes);
router.use('/location', LocationRoutes);
router.use('/phone', PhoneRoutes);
router.use('/socialnet', SocialRoutes);

export default router;