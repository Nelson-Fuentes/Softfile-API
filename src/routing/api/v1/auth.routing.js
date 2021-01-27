import { Router } from 'express';
import * as AuthViews from '../../../views/auth.views'
import * as EmailMiddelwares from '../../../middlewares/email.middleware'

const router = Router();

router.post('/reset', [EmailMiddelwares.verify_email_registred, EmailMiddelwares.verify_email_validated], AuthViews.reset_password_request);

export default router;