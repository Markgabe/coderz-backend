/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Users', 'xp', { type: Sequelize.DataTypes.INTEGER, defaultValue: 0 }),
    queryInterface.addColumn('Users', 'rank', { type: Sequelize.DataTypes.STRING, defaultValue: 'silver' }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Users', 'xp'),
    queryInterface.removeColumn('Users', 'rank'),
  ]),
};
