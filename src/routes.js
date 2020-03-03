import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ToolController from './app/controllers/ToolController';
import ListToolController from './app/controllers/ListToolController';
import ListToolTagController from './app/controllers/ListToolTagController';

const routes = new Router();

const bruteStore = new BruteRedis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore, {
    freeRetries: 10,
    minWait: 60 * 1000,
});

routes.get('/', (req, res) => {
    return res.json({
        message: 'API do desafio VUTTR Bossabox.com ',
    });
});

routes.post('/users', UserController.store);

routes.post('/sessions', bruteForce.prevent, SessionController.store);

routes.use(authMiddleware);

routes.post('/tools', ToolController.store);
routes.get('/tools', ToolController.index);

routes.get('/list-tools', ListToolController.index);
routes.get('/list-tools-tags', ListToolTagController.index);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

export default routes;
