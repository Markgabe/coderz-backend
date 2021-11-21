import crypto from 'crypto';

import { User } from '../models';

module.exports = {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const passwordHash = crypto.createHash('sha256').update(password).digest('base64');

      const { name: userName, email: userEmail } = await User.create(
        { name, email, password: passwordHash },
      );

      res.json({ userName, userEmail });
    } catch (error) {
      res.status(403).json({ error: error.name });
    }
  },

  async index(req, res) {
    const users = await User.scope('withoutPassword').findAll();
    res.json(users);
  },
};
