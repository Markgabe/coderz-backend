module.exports = (sequelize, DataTypes) => {
  const ChallengeSubmission = sequelize.define('ChallengeSubmission', {
    successful: DataTypes.BOOLEAN,
    startedAt: DataTypes.DATE,
    finishedAt: DataTypes.DATE,
    challengeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  });

  ChallengeSubmission.associate = (models) => {
    ChallengeSubmission.belongsTo(models.Challenge, { foreignKey: 'challengeId', as: 'challenge' });
    ChallengeSubmission.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return ChallengeSubmission;
};
