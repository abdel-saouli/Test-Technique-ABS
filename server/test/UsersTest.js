process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let chaiHttp = require("chai-http");
let User = require("../model/user.model");
let chai = require("chai");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("testing Api REST for router /users", () => {
  beforeEach(done => {
    var newUser = new User({
      firstName: "firstName1",
      lastName: "lastName1",
      username: "username1",
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

  it("should list ALL blobs on /users GET", done => {
    chai
      .request(server)
      .get("/users")
      .end((err, res) => {
        res.should.have.status(200);
        res.type.should.equal("application/json");
        res.body.should.be.a("array");
        res.body[0].should.have.property("_id");
        res.body[0].should.have.property("firstName");
        res.body[0].should.have.property("lastName");
        res.body[0].should.have.property("username");
        res.body[0].should.have.property("password");
        res.body[0].firstName.should.equal("firstName1");
        done();
      });
  });

  it("should list a SINGLE user on /users/:id GET", done => {
    var newUser = new User({
      firstName: "firstName2",
      lastName: "lastName2",
      username: "username2",
      password: "test"
    });

    newUser.save((err, data) => {
      chai
        .request(server)
        .get("/users/" + data.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");

          res.body.should.have.property("_id");
          res.body.should.have.property("firstName");
          res.body.should.have.property("lastName");
          res.body.should.have.property("username");
          res.body.should.have.property("password");

          res.body._id.should.be.equal(data.id);
          res.body.firstName.should.be.equal("firstName2");
          res.body.lastName.should.be.equal("lastName2");
          res.body.username.should.be.equal("username2");
          done();
        });
    });
  });

  it("should add a SINGLE user on /users POST", function(done) {
    chai
      .request(server)
      .post("/users")
      .send({
        firstName: "firstName3",
        lastName: "lastName3",
        username: "username3",
        password: "test"
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;

        res.body.should.be.a("object");

        res.body.should.have.property("_id");
        res.body.should.have.property("firstName");
        res.body.should.have.property("lastName");
        res.body.should.have.property("username");
        res.body.should.have.property("password");

        res.body.firstName.should.equal("firstName3");
        res.body.lastName.should.equal("lastName3");
        res.body.username.should.equal("username3");
        done();
      });
  });

  it("should update a SINGLE blob on /users/:id PUT", function(done) {
    chai
      .request(server)
      .get("/users")
      .end(function(err, res) {
        chai
          .request(server)
          .put("/users/" + res.body[0]._id)
          .send({ firstName: "firstName2" })
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a("object");
            response.body.should.be.a("object");
            response.body.should.have.property("firstName");
            response.body.should.have.property("_id");
            response.body.firstName.should.equal("firstName2");
            done();
          });
      });
  });

  it("should delete a SINGLE blob on /users/:id DELETE", done => {
    chai
      .request(server)
      .get("/users")
      .end((err, res) => {
        chai
          .request(server)
          .delete("/users/" + res.body[0]._id)
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a("object");
            response.body.should.have.property("firstName");
            response.body.should.have.property("_id");
            response.body.firstName.should.equal("firstName1");
            done();
          });
      });
  });
});
