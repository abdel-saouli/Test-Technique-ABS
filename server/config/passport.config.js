const passport = require("passport");
let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
let User = require("../model/user.model");
let config = require("../config/main");

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret;
passport.use(
  new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload.id, function(err, user) {
      if (err) {
        console.log("error ", err);
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        console.log("error 2 : ", err);
        done(null, false);
      }
    });
  })
);

module.exports = passport;
