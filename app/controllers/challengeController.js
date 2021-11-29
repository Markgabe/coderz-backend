import { Challenge, ChallengeSubmission } from '../models';

import { getUser } from '../services/userService';

const Sequelize = require('sequelize');

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

  async indexWithUserCompletedInfo(req, res) {
    try {
      const { id: userId } = await getUser(req);

      const challenges = await Challenge.findAll({
        attributes: {
          include: [[Sequelize.fn('COUNT', Sequelize.col('submissions.id')),
            'successfulSubmissions']],
        },
        include: [{
          model: ChallengeSubmission,
          as: 'submissions',
          required: false,
          where: {
            userId,
            successful: true,
          },
          attributes: [],
        }],
        group: ['Challenge.id'],
      });
      res.send(challenges);
    } catch (error) {
      res.send(error);
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
