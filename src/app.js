import 'dotenv/config';
import express from 'express';
import routes from './routes';

import './database';

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

    exceptionHandler() {
        this.server.use(async (err, req, res, next) => {
            if (process.env.NODE_ENV === 'development') {
                // const erros = await Youch(err, req).toJSON();
                // return res.status(500).json(erros);
            }

            return res.status(500).json({ erro: 'Internal server error' });
        });
    }
}

export default new App().server;
