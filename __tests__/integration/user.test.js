import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import truncate from '../util/truncate';
import factory from '../factories';

describe('User', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('A senha do usuário deve ser criptografada', async () => {
        const user = await factory.create('User', {
            password: '123456',
        });

        const compareHash = await bcrypt.compare(
            user.password,
            user.password_hash
        );

        expect(compareHash).toBe(true);
    });

    it('Deve habilitar o registro do usuário', async () => {
        const user = await factory.attrs('User');

        const response = await request(app)
            .post('/users')
            .send(user);

        expect(response.body).toHaveProperty('id');
    });

    it('Não pode haver ducplicidade de email no sistema', async () => {
        const user = await factory.attrs('User');

        await request(app)
            .post('/users')
            .send(user);

        const response = await request(app)
            .post('/users')
            .send(user);

        expect(response.badRequest);
    });

    it('Deve haver erro de validação de dados quando passada na requisição as propriedades erradas', async () => {
        const userError = await factory.attrs('UserErrorValidation');

        const response = await request(app)
            .post('/users')
            .send(userError);

        expect(response.badRequest);
    });
});
