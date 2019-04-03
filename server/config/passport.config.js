const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user.model");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    (username, password, done) => {
      User.findOne({ username })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: "Incorrect email or password."
            });
          }
          if (user.password !== password) {
            return done(null, false, {
              message: "Incorrect email or password."
            });
          }
          return done(null, user);
        })
        .catch(err => done(err));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
