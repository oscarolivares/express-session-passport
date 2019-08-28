const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('./database');
const passport = require('passport');
const passportConfig = require('./passport');
const sessionController = require('./controllers/session.controller');

const app = express();
db.connect();

// Express-session middleware
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

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Ready');
});

app.post('/signup', sessionController.signup);
app.post('/login', sessionController.login);
app.get('/logout', passportConfig.isAutheticated, sessionController.logout);

app.get('/user-info', passportConfig.isAutheticated, (req, res) => {
  res.json(req.user);
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
