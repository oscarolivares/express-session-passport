const mongoose = require('mongoose');

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

connect();
