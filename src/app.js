const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('./database');

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
