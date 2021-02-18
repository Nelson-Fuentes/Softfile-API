import { Router } from 'express';
import * as PhoneViews from '../../../views/phone.views';
import * as AuthMiddlewares from '../../../middlewares/auth.middleware';
import * as PhoneMiddlewares from '../../../middlewares/phone.middleware';

const router = Router();

router.get('/codes', PhoneViews.get_all_phone_codes);
router.post('', [AuthMiddlewares.verify_a_token_was_sended, AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token, PhoneMiddlewares.verify_phone_duplicated], PhoneViews.create_phone_user_auth);
router.get('', [AuthMiddlewares.verify_a_token_was_sended, AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token], PhoneViews.get_all_phones_user_auth);
router.put('/:id', [AuthMiddlewares.verify_a_token_was_sended, AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token, PhoneMiddlewares.verify_phone_duplicated, PhoneMiddlewares.verify_phone_belongs_user_auth], PhoneViews.update_phone_user_auth);
router.delete('/:id', [AuthMiddlewares.verify_a_token_was_sended, AuthMiddlewares.verify_token_expires, AuthMiddlewares.verify_user_from_token, PhoneMiddlewares.verify_phone_belongs_user_auth], PhoneViews.delete_phone_user_auth);


export default router;