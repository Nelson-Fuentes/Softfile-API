import { Router } from 'express';
import * as PhoneViews from '../../../views/phone.views';

const router = Router();

router.get('/codes', PhoneViews.get_all_phone_codes);

export default router;