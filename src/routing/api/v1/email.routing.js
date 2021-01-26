import { Router } from 'express';
import * as EmailViews from '../../../views/email.views'

const router = Router();

router.post('/validate', EmailViews.validate_email);

export default router;