const mongoose = require('mongoose');

// MongoDB connection
async function connect() {
  try {
    await mongoose.connect('mongodb://localhost/sessionTest', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('Database is connected');
  } catch (error) {
    console.log('Database connection problem');
  }
}

// Exports:
// connect for instantiate the db in app.js
// mongoose for MongoStore connection
module.exports = {
  connect,
  mongoose
};
