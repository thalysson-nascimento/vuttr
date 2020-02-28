import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ToolController from './app/controllers/ToolController';
import ListToolController from './app/controllers/ListToolController';
import ListToolTagController from './app/controllers/ListToolTagController';

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({
        message: 'API do desafio VUTTR Bossabox.com ',
    });
});

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/tools', ToolController.store);
routes.get('/tools', ToolController.index);
routes.delete('/tools/:id', ToolController.delete);

routes.get('/list-tools', ListToolController.index);
routes.get('/list-tools-tags', ListToolTagController.index);

export default routes;
