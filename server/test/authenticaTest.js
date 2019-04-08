process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let chaiHttp = require("chai-http");
let User = require("../model/user.model");
let chai = require("chai");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("testing Api REST for router /users", () => {
  beforeEach(done => {
    var newUser = new User({
      firstName: "saouli",
      lastName: "abdel",
      username: "root",
      password: "test"
    });

    newUser
      .save()
      .then(res => {
        done();
      })
      .catch(err => {
        done();
      });
  });

  afterEach(done => {
    User.collection.drop();
    done();
  });

  it("should login a user with username corecte", done => {
    chai
      .request(app)
      .post("/authenticate")
      .send({
        username: "root",
        password: "test"
      })
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql("application/json");
        res.body.should.include.keys("success", "token");
        res.body.success.should.eql(true);
        res.body.token.should.be.include("Bearer");
        should.exist(res.body.token);
        done();
      });
  });

  it("should login a user with username incorecte", done => {
    chai
      .request(app)
      .post("/authenticate")
      .send({
        username: "rootIncorect",
        password: "test"
      })
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(401);
        res.type.should.eql("application/json");
        res.body.should.include.keys("success", "message");
        res.body.success.should.eql(false);
        res.body.message.should.eql("Authentication failed.");
        should.not.exist(res.body.token);
        done();
      });
  });

  it("should not login an unregistered user", done => {
    chai
      .request(app)
      .post("/authenticate")
      .send({
        username: "salamo",
        password: "battata"
      })
      .end((err, res) => {
        if (err) {
          console.log("error : ", err);
        }
        should.not.exist(err);
        res.status.should.eql(401);
        res.type.should.eql("application/json");
        res.body.should.include.keys("success", "message");
        res.body.success.should.eql(false);
        res.body.message.should.eql("Authentication failed.");
        should.not.exist(res.body.token);
        done();
      });
  });

  describe("GET /users last post /authenticate", () => {
    it("should return a success", done => {
      chai
        .request(app)
        .post("/authenticate")
        .send({
          username: "root",
          password: "test"
        })
        .end((error, response) => {
          should.not.exist(error);
          chai
            .request(app)
            .get("/users")
            .set("authorization", response.body.token)
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.eql(200);
              res.type.should.eql("application/json");
              res.body.should.be.a("array");
              done();
            });
        });
    });

    it("should throw an error if a user is not logged in", done => {
      chai
        .request(app)
        .get("/users")
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          done();
        });
    });
  });
});
