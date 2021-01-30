import { Router } from 'express';

import projectRoute from './project.route';
import userRoute from './user.route';

const router = Router();

router.use('/project', projectRoute);
router.use('/user', userRoute);

export default router;
