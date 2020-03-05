import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';
import factory from '../factories';

describe('Session', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('Deve possibilitar a autenticação do usuário', async () => {
        const user = await factory.create('User');

        const session = await factory.attrs('Session', {
            email: user.email,
            password: user.password,
        });

        const response = await request(app)
            .post('/sessions')
            .send(session);

        expect(response.body).toHaveProperty('token');
    });

    it('Deve haver erro de usuário não encontrado', async () => {
        const session = await factory.attrs('Session');

        const response = await request(app)
            .post('/sessions')
            .send(session);

        expect(response.status).toBe(401);
    });

    it('Deve haver erro de validação de dados quando passada na requisição as propriedades erradas', async () => {
        const session = await factory.attrs('SessionErrorValidation');

        const response = await request(app)
            .post('/sessions')
            .send(session);

        expect(response.badRequest);
    });

    it('Deve haver o erro de senha não confere', async () => {
        const session = await factory.attrs('Session', {
            password: '123456',
        });

        const response = await request(app)
            .post('/sessions')
            .send(session);

        expect(response.unauthorized);
    });
});
