import { Router } from 'express';
import * as ImageViews from '../../views/img.views'

const router = Router();

router.get('/:filename', ImageViews.view_image);

export default router;