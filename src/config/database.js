const mongoose = require('mongoose');

async function connectDatabase(config) {
  await mongoose.connect(config.mongoUri);
  console.log('MongoDB connected successfully');
}

module.exports = { connectDatabase };