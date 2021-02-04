import { Router } from 'express';
import * as AuthViews from '../../../views/auth.views'
import * as EmailMiddlewares from '../../../middlewares/email.middleware';
import * as UserMiddlewares from '../../../middlewares/user.middleware';
import * as AuthMiddlewares from '../../../middlewares/auth.middleware';

const router = Router();

router.post('', [UserMiddlewares.verify_username_exists], AuthViews.authentication);
router.post('/reset', [EmailMiddlewares.verify_email_registred], AuthViews.reset_password_request);
router.put('/password/:token', AuthViews.reset_password_action);
router.get('/verify', [AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token]);

export default router;