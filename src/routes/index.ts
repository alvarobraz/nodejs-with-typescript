import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { usersRouters } from './user.routes';

const router = Router();

router.use('/users', usersRouters);
router.use(authenticateRoutes);

export { router };
