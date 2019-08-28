const passport = require('passport');
const User = require('../models/User');

exports.signup = (req, res, next) => {
  // Find if exist
  User.findOne({ email: req.body.email }, (err, match) => {
    // If exist return 400
    if (match) {
      return res.status(400).send('Email exist');
    }

    // Else create user and make login
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      fristname: req.body.fristname,
      lastname: req.body.lastname
    });

    newUser
      .save()
      .then(() => {
        // Auto login affter save
        req.logIn(newUser, err => {
          if (err) {
            next(err);
          }
          res.send('User created and login');
        });
      })
      .catch(err => {
        next(err);
      });
  });
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      next(err);
    }
    if (!user) {
      return res.status(400).send('email or password invalid');
    }

    req.logIn(user, err => {
      if (err) {
        next(err);
      }
      res.send('Login success');
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.send('Logout success');
};
