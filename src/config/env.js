const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

module.exports = {
  PORT: process.env.PORT || 8081,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/todo-app',
};