import { User } from '../models';

module.exports = {

  async index(req, res) {
    try {
      const rank = await User.scope('withoutPassword').findAll({
        order: [
          ['xp', 'DESC'],
        ],
      });
      res.json(rank);
    } catch (error) {
      res.status(403).json({ error: error.name });
    }
  },
};
