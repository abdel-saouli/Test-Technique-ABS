const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const mongoURI = {
  development: "mongodb://localhost:27017/db",
  test: "mongodb://localhost/db-test"
};

const connection = env =>
  mongoose
    .connect(mongoURI[env], {
      useNewUrlParser: true
    })
    .then(() => {
      console.log("Database connected !", env);
    })
    .catch(err => {
      console.log("Error of connection ", err);
    });

module.exports = connection;
