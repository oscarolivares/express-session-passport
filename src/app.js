const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('./database');
const User = require('./models/User');

const app = express();
db.connect();

app.use(
  session({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: db.mongoose.connection
    })
  })
);

app.get('/', (req, res) => {
  req.session.counter = req.session.counter ? req.session.counter + 1 : 1;
  res.send(`You have requested this page <${req.session.counter}> times`);
});

// Router for test user creation operations
/* app.get('/create-user', async (req, res) => {
  const UserTest = new User({
    email: 'user@test.com',
    password: '123',
    fristname: 'John',
    lastname: 'Doe'
  });

  UserTest.save()
    .then(() => {
      console.log(UserTest);
      res.send('Seccess');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Fail');
    });
}); */

// Status 404 handler
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listenner
app.listen(3000, () => {
  console.log('Server on port 3000');
});
