import { Router } from 'express';
import * as LocationViews from '../../../views/location.views';

const router = Router();

router.get('/country', LocationViews.get_all_country);
router.get('/country/:id', LocationViews.get_country);
router.get('/:id', LocationViews.get_city)

export default router;