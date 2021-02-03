import { Router } from 'express';
import * as AuthViews from '../../../views/auth.views'
import * as EmailMiddelwares from '../../../middlewares/email.middleware'
import * as UserMiddelwares from '../../../middlewares/user.middleware'

const router = Router();

router.post('', [UserMiddelwares.verify_username_exists], AuthViews.authentiction);
router.post('/reset', [EmailMiddelwares.verify_email_registred], AuthViews.reset_password_request);
router.put('/password/:token', AuthViews.reset_password_action);
export default router;
