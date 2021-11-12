module.exports = (sequelize, DataTypes) => {
  const TestCase = sequelize.define('TestCase', {
    input: DataTypes.JSON,
    output: DataTypes.JSON,
    challengeId: DataTypes.INTEGER,
  });

  TestCase.associate = (models) => {
    TestCase.belongsTo(models.Challenge, { foreignKey: 'challengeId', as: 'challenge' });
  };
  return TestCase;
};
