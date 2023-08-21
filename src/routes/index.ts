import { Router } from 'express';

import { authenticateRoutes } from '@routes/authenticate.routes';
import { usersRouters } from '@routes/user.routes';
import { passwordRoutes } from './password.routes';

const router = Router();

router.use('/users', usersRouters);
router.use('/password', passwordRoutes);
router.use(authenticateRoutes);

export { router };
