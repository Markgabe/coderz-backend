require('dotenv').config();

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'coderz',
  host: '127.0.0.1',
  dialect: 'postgres',
};
