const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/walletApp',
  PORT: process.env.PORT || 5000,
};
