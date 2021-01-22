import { Router } from 'express';
import * as APIView from './api.v1.views';

const router = Router();

router.get("", APIView.api_view);

export default router;