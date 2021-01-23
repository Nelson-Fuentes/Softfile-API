import { Router } from 'express';
import * as APIView from './api.v1.views';
import UserRoutes from './user/user.routing';

const router = Router();

router.get("", APIView.api_view);

router.use("/user", UserRoutes);

export default router;