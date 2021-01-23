import { Router } from 'express';
import * as UserViews from './user.views'
import * as UserMiddlewares from './user.middleware';

const router = Router();

router.post('', [UserMiddlewares.check_username_duplicated], UserViews.create_user);

export default router;