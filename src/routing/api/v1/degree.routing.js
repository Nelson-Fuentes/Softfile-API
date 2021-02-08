import { Router } from 'express';
import * as DegreeViews from '../../../views/degree.views'

const router = Router();

router.get('', DegreeViews.get_all_degrees);

export default router;