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

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
opts.issuer = "Abdel SAOULI";

passport.use(
  new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
