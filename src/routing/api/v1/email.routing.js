import { Router } from 'express';
import * as EmailViews from '../../../views/email.views'

const router = Router();

router.get('/validate/:token', EmailViews.validate_email);

export default router;