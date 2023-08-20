import { Router } from 'express';

import { authenticateRoutes } from '@routes/authenticate.routes';
import { usersRouters } from '@routes/user.routes';

const router = Router();

router.use('/users', usersRouters);
router.use(authenticateRoutes);

export { router };
