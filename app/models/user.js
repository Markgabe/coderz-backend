module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rank: DataTypes.STRING,
    xp: DataTypes.INTEGER,
  },
  {
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.ChallengeSubmission, { as: 'submissions', foreignKey: 'userId' });
  };
  return User;
};
