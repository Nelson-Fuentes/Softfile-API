import { Router } from 'express';
import * as ProfileViews from '../../../views/profile.views'
import * as AuthMiddlewares from '../../../middlewares/auth.middleware';

const router = Router();

router.get('', [AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token], ProfileViews.get_profile);

export default router;