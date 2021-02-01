import { Router } from 'express';
import * as AuthViews from '../../../views/auth.views'
import * as EmailMiddelwares from '../../../middlewares/email.middleware'

const router = Router();

router.post('/reset', [EmailMiddelwares.verify_email_registred], AuthViews.reset_password_request);
router.post('/password/:token', AuthViews.reset_password_action);
export default router;