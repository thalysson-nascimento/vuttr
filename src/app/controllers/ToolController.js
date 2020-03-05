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
                .status(401)
                .json({ error: 'Erro na validação de dados' });
        }

        const { title, link, description, tags } = req.body;

        const tagsArray = tags.split(',').map(tag => tag.trim());

        await Tool.create({
            title,
            link,
            description,
            tags: tagsArray,
            user_id: req.userId,
        });

        return res.json({ title, link, description, tagsArray });
    }

    async index(req, res) {
        const { page = 1 } = req.query;

        const tool = await Tool.findAll({
            where: { user_id: req.userId },
            attributes: ['id', 'title', 'link', 'description', 'tags'],
            limit: 20,
            offset: (page - 1) * 20,
        });

        if (JSON.stringify(tool) === '[]') {
            return res
                .status(204)
                .json({ error: 'Não há ferramentas cadastradas' });
        }

        return res.json(tool);
    }

    async delete(req, res) {
        const idTool = req.params.id;

        const tool = await Tool.findByPk(idTool);

        if (!tool) {
            return res.status(401).json({ error: 'Ferramenta não encontrada' });
        }

        if (tool.user_id !== req.userId) {
            return res.status(401).json({ error: 'Ferramenta não encontrada' });
        }

        const deleteTool = await tool.destroy({ where: { id: idTool } });

        return res.status(204).json(deleteTool);
    }
}

export default new ToolController();
