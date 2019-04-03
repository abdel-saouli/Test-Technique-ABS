var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let connectionn = require("./config/mongoose.config");
let passport = require("./config/passport.config");
let session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");

var app = express();
app.use(
  session({
    secret: "root",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
connectionn(app.get("env"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.post("/login", (req, res, next) => {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }
    req.session.save(err => {
      if (err) {
        return next(err);
      }
      res.status(200).json(user);
    });
  })(req, res, next);
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

module.exports = app;
