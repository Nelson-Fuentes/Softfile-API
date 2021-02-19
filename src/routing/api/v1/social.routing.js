import * as SocialViews from '../../../views/social.views';
import { Router } from 'express';
import * as AuthMiddlewares from '../../../middlewares/auth.middleware';

const router = Router();

router.get('/default', SocialViews.get_all_socialnets);
router.post('', SocialViews.create_socialnet_user_auth);
router.put('/:id', SocialViews.update_social_user_auth);
router.get('', SocialViews.get_socialnet_user_auth);

export default router;