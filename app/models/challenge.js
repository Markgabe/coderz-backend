module.exports = (sequelize, DataTypes) => {
  const Challenge = sequelize.define('Challenge', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    gainedXP: DataTypes.INTEGER,
    level: DataTypes.INTEGER,
    category: DataTypes.STRING,
  }, {});

  Challenge.associate = (models) => {
    Challenge.hasMany(models.TestCase, { as: 'testCases', foreignKey: 'challengeId' });
  };
  return Challenge;
};
