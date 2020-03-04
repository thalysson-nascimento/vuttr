import request from 'supertest';
import truncate from '../util/truncate';

import factory from '../factories';
import app from '../../src/app';

describe('Tool', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('Deve criar as ferramentas após está devidamente autenticado', async () => {
        const user = await factory.create('User');

        const tool = await factory.attrs('Tool');

        const response = await request(app)
            .post('/tools')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send(tool);

        expect(response.body).toHaveProperty('title');
    });

    it('Deve listar as ferramentas do usuário após está devidamente autenticado', async () => {
        const user = await factory.create('User');

        const response = await request(app)
            .get('/tools')
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it('Não pode listar as ferramentas do usuário sem está autenticado', async () => {
        const tool = await factory.attrs('Tool');

        const response = await request(app)
            .get('/tools')
            .send(tool);

        expect(response.status).toBe(401);
    });

    it('Deve deletar a ferramenta do usuário após está devidamente autenticado', async () => {
        const user = await factory.create('User');

        const tool = await factory.attrs('Tool');

        const createTool = await request(app)
            .post('/tools')
            .set('Authorization', `Bearer ${user.generateToken()}`)
            .send(tool);

        const response = await request(app)
            .delete(`/tools/${createTool.id}`)
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });
});
