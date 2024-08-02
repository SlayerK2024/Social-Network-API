const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/socialNetworkDB';

mongoose.connect(connectionString);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

module.exports = db;

