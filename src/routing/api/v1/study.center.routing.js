import * as StudyCenterViews from '../../../views/study.center.views';
import { Router } from 'express';
import * as AuthMiddlewares from '../../../middlewares/auth.middleware';
import * as StudyCenterMiddleware from '../../../middlewares/study.center.middleware'

const router = Router();

router.post('', [AuthMiddlewares.verify_a_token_was_sended, AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token], StudyCenterViews.create_study_center_user_auth);
router.put('/:id', [AuthMiddlewares.verify_a_token_was_sended, AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token, StudyCenterMiddleware.verify_study_center_belongs_user_auth], StudyCenterViews.update_study_center_auth);
router.get('', [AuthMiddlewares.verify_a_token_was_sended, AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token], StudyCenterViews.get_study_center_user_auth);
router.delete('/:id', [AuthMiddlewares.verify_a_token_was_sended, AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token, StudyCenterMiddleware.verify_study_center_belongs_user_auth], StudyCenterViews.delete_study_center_user)



export default router;