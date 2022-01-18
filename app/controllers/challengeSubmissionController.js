import { ChallengeSubmission, Challenge } from '../models';

import { getUser, updateXP } from '../services/userService';

module.exports = {
  async create(req, res) {
    const COMPLETED_CHALLENGE_XP_RATIO = 0.2;
    const submissionResult = {
      xpGained: 0,
      completionTime: null,
    };
    try {
      const {
        successful, startedAt: rawStartedAt, finishedAt: rawFinishedAt,
      } = req.body;

      // Convert date format
      const startedAt = new Date(rawStartedAt);
      const finishedAt = new Date(rawFinishedAt);

      const { id: challengeId } = req.params;

      const { id: userId } = await getUser(req);

      // Get already sent submissions for this user and challenge
      const pastSubmissions = await ChallengeSubmission.findAll({
        where: {
          userId,
          challengeId,
        },
      });

      // Create challenge submission
      const challengeSubmission = await ChallengeSubmission.create({
        successful, startedAt, finishedAt, challengeId, userId,
      });

      // Check if user failed
      if (!successful) {
        return res.json({ ...submissionResult, submission: challengeSubmission });
      }

      // Get challenge's info
      const { gainedXP } = await Challenge.findByPk(challengeId);

      // Check if user already completed this challenge
      const userCompletedChallenge = pastSubmissions.some((submission) => submission.successful);

      if (!userCompletedChallenge) {
        // Give user challenge's base xp
        updateXP(req, gainedXP);
        submissionResult.xpGained = gainedXP;
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
          await updateXP(req, gainedXP * COMPLETED_CHALLENGE_XP_RATIO);
          submissionResult.xpGained = parseInt(gainedXP * COMPLETED_CHALLENGE_XP_RATIO, 10);
        }
      }
      submissionResult.completionTime = finishedAt - startedAt;

      res.json({ ...submissionResult, submission: challengeSubmission });
    } catch (error) {
      res.status(403).json({ error: error.name });
    }
  },
};
