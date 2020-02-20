import * as Yup from 'yup';
import Tool from '../models/Tool';

class ToolController {
    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            link: Yup.string()
                .url()
                .required(),
            description: Yup.string().required(),
            tags: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Erro na validação de dados' });
        }

        const { title, link, description, tags } = req.body;

        const arrayTags = tags.split(',').map(tag => tag.trim());

        await Tool.create({
            title,
            link,
            description,
            tags: arrayTags,
            user_id: req.userId,
        });

        return res.json({ title, link, description, arrayTags });
    }

    async index(req, res) {
        const { page = 1 } = req.query;

        const tool = await Tool.findAll({
            where: { user_id: req.userId },
            attributes: ['id', 'title', 'link', 'description', 'tags'],
            limit: 20,
            offset: (page - 1) * 20,
        });

        return res.json(tool);
    }
}

export default new ToolController();
