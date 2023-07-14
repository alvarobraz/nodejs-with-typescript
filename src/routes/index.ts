import { Router } from 'express';

import { usersRouters } from './user.routes';

const router = Router();

router.use('/users', usersRouters);

export { router };
