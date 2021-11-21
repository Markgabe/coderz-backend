import { Challenge } from '../models';

module.exports = {
  async create(req, res) {
    try {
      const challenge = await Challenge.create(req.body);
      res.json(challenge);
    } catch (error) {
      res.status(403).json({ error: error.name });
    }
  },

  async index(req, res) {
    try {
      const challenges = await Challenge.findAll({ include: ['testCases'] });
      res.json(challenges);
    } catch (error) {
      res.status(403).json({ error: error.name });
    }
  },

  async findOneWithTestCases(req, res) {
    try {
      const { id } = req.params;
      const challenge = await Challenge.findByPk(id, { include: ['testCases'] });
      res.json(challenge);
    } catch (error) {
      res.status(403).json({ error: error.name });
    }
  },
};
