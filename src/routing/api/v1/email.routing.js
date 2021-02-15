import { Router } from 'express';
import * as EmailViews from '../../../views/email.views'
import * as AuthMiddlewares from '../../../middlewares/auth.middleware';
import * as EmailMiddlewares from '../../../middlewares/email.middleware';

const router = Router();

router.get('/validate/:token', EmailViews.validate_email);
router.get('', [AuthMiddlewares.verify_a_token_was_sended, AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token], EmailViews.get_user_emails);
router.post('', [AuthMiddlewares.verify_a_token_was_sended, AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token, EmailMiddlewares.check_email_duplicated], EmailViews.create_email);
router.put('/:id', [AuthMiddlewares.verify_a_token_was_sended, AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token, EmailMiddlewares.check_email_duplicated, EmailMiddlewares.verify_email_belong_user_auth], EmailViews.update_email_adress);
router.delete('/:id', [AuthMiddlewares.verify_a_token_was_sended, AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token, EmailMiddlewares.check_email_duplicated, EmailMiddlewares.verify_email_belong_user_auth, EmailMiddlewares.verify_email_one_email_will_persist], EmailViews.delete_email);

export default router;