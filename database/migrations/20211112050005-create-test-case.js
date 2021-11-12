/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TestCases', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    input: {
      type: Sequelize.JSON,
    },
    output: {
      type: Sequelize.JSON,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('TestCases'),
};
