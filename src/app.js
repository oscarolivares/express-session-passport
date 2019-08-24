const express = require('express');
const session = require('express-session');
require('./database');

const app = express();

app.use(
  session({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true
  })
);

app.get('/', (req, res) => {
  res.send('Server Ready');
});

// Middlewares for errors
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server on port 3000');
});
