import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Erro na validação de dados' });
        }

        const emailExist = await User.findOne({
            where: { email: req.body.email },
        });

<<<<<<< HEAD
        if (userExist) {
            return res.status(401).json({ error: 'Usuário existente' });
=======
        if (emailExist) {
            return res.status(400).json({ error: 'Usuário existente' });
>>>>>>> feature/test
        }

        const { id, name, email } = await User.create(req.body);

        return res.json({ id, name, email });
    }

    async index(req, res) {
        const user = await User.findByPk(req.userId);

        if (!user) {
            return res.status(401).json({ error: 'Usuário existente' });
        }

        const { id, name, email } = user;

        return res.json({ id, name, email });
    }
}

export default new UserController();
