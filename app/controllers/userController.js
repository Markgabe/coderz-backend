import { User } from '../models';

module.exports = {
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      const { name, email } = user;
      res.json({ name, email });
    } catch (error) {
      res.status(403).json({ error: error.name });
    }
  },

  async getAll(req, res) {
    const users = await User.findAll();
    res.json(users);
  },
};
