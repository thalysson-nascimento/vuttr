import { Op } from 'sequelize';
import Tool from '../models/Tool';

class ListToolTagController {
    async index(req, res) {
        const { tag, page = 1 } = req.query;

        const tool = await Tool.findAll({
            attributes: ['id', 'title', 'link', 'description', 'tags'],
            where: { tags: { [Op.contains]: [tag] } },
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
}

export default new ListToolTagController();
