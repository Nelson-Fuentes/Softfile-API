import { Router } from 'express';
import * as UserViews from '../../../views/user.views'
import * as UserMiddlewares from '../../../middlewares/user.middleware';
import * as EmailMiddlewares from '../../../middlewares/email.middleware';

const router = Router();

router.post('', [UserMiddlewares.check_username_duplicated, EmailMiddlewares.check_email_duplicated], UserViews.create_user);

export default router;