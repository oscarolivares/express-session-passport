const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Local strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (!user) {
        return done(null, false, { message: 'This email is not exist' });
      } else {
        user.verifyPassword(password, (err, match) => {
          if (match) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password did not match' });
          }
        });
      }
    });
  })
);

// Middleware that check if an user is authenticated
exports.isAutheticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('You must login to continue');
};
