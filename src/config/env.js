const path = require('path'); // Kun folder maa jaanu parne bhanne dekhauxa

require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
}); // .env file ma bhako sabai kura lyayera raakhxa


module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
}