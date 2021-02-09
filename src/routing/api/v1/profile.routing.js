import { Router } from 'express';
import * as ProfileViews from '../../../views/profile.views'
import * as AuthMiddlewares from '../../../middlewares/auth.middleware';
import * as ProfileMiddlewares from '../../../middlewares/profile.middleware'

const router = Router();

router.get('', [AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token], ProfileViews.get_profile);
router.put('', [AuthMiddlewares.verify_a_token_was_sended, AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token, ProfileMiddlewares.verify_exists_degree_id], ProfileViews.update_profile);

export default router;