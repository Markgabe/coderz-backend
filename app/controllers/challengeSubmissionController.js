import { ChallengeSubmission, Challenge, User } from '../models';

module.exports = {
  async create(req, res) {
    const COMPLETED_CHALLENGE_XP_RATIO = 0.2;
    try {
      const {
        successful, startedAt: rawStartedAt, finishedAt: rawFinishedAt,
      } = req.body;

      // Convert date format
      const startedAt = new Date(rawStartedAt);
      const finishedAt = new Date(rawFinishedAt);

      const { id: challengeId } = req.params;

      // Get user's info
      const { user: { email: username } } = req;
      const foundUsers = await User.findAll({
        where: {
          email: username,
        },
      });

      const { id: userId, xp: userXp } = foundUsers[0];

      // Create challenge submission
      const challengeSubmission = await ChallengeSubmission.create({
        successful, startedAt, finishedAt, challengeId, userId,
      });

      // Check if user failed
      if (!successful) {
        return res.json(challengeSubmission);
      }

      // Get already sent submissions for this user and challenge
      const pastSubmissions = await ChallengeSubmission.findAll({
        where: {
          userId,
          challengeId,
        },
      });

      // Get challenge's info
      const { gainedXP } = await Challenge.findByPk(challengeId);

      // Check if user already completed this challenge
      const userCompletedChallenge = pastSubmissions.some((submission) => submission.successful);

      if (!userCompletedChallenge) {
        // Give user challenge's base xp
        await User.update({ xp: userXp + gainedXP }, {
          where: {
            id: userId,
          },
        });
        // TODO: Give user rank upgrade
      } else {
        // Check lowest user's completion time
        const lowestCompletionTime = Math.min(...pastSubmissions.map(
          (submission) => submission.finishedAt - submission.startedAt,
        ));
        if (finishedAt - startedAt < lowestCompletionTime) {
          // TODO: Give user rank upgrade
        } else {
          // Give user a ratio of challenge's xp
          await User.update(
            { xp: userXp + parseInt(gainedXP * COMPLETED_CHALLENGE_XP_RATIO, 10) }, {
              where: {
                id: userId,
              },
            },
          );
        }
      }

      res.json(challengeSubmission);
    } catch (error) {
      res.status(403).json({ error: error.name });
    }
  },
};