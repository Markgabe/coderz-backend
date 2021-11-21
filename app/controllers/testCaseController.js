import { TestCase } from '../models';

module.exports = {
  async create(req, res) {
    try {
      const { input, output, challengeId } = req.body;
      const testCase = await TestCase.create({
        input, output, challengeId,
      });
      res.json(testCase);
    } catch (error) {
      res.status(403).json({ error: error.name });
    }
  },
};
