/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ChallengeSubmissions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    successful: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    startedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    finishedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    challengeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Challenges',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ChallengeSubmissions'),
};
