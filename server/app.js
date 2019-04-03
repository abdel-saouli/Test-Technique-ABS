var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let connectionn = require("./config/mongoose.config");
let passport = require("./config/passport.config");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");

var app = express();
app.use(passport.initialize());

connectionn(app.get("env"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const config = require("./config/main");
const jwt = require("jsonwebtoken");
const User = require("./model/user.model");

app.post("/authenticate", function(req, res) {
  User.findOne(
    {
      username: req.body.username
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res
          .status(401)
          .json({ success: false, message: "Authentication failed." });
      } else {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            const token = jwt.sign({ user: "test" }, config.jwtSecret, {
              expiresIn: 86400
            });
            res.status(200).json({ success: true, token });
          } else {
            res
              .status(401)
              .json({ success: false, message: "Authentication failed." });
          }
        });
      }
    }
  );
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

module.exports = app;
