import { Router } from 'express';

import UserController from './app/controllers/UserController';

const router = new Router();

router.post('/users', UserController.store);
router.get('/users', UserController.index);

export default router;
