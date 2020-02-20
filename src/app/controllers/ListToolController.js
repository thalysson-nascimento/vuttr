import Tool from '../models/Tool';

class ListToolController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const tool = await Tool.findAll({
            attributes: ['id', 'title', 'link', 'description', 'tags'],
            limit: 20,
            offset: (page - 1) * 20,
        });

        return res.json(tool);
    }
}

export default new ListToolController();
