process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let chaiHttp = require("chai-http");
let Product = require("../model/product.model");
let chai = require("chai");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("testing Api REST for router /products", () => {
  beforeEach(done => {
    var newProduct = new Product({
      name: "product1",
      price: "price1",
      discription: "discription of product1",
      userId: "5ca4cf2703d730115c6ac81e"
    });

    newProduct
      .save()
      .then(res => {
        done();
      })
      .catch(err => {
        done();
      });
  });

  afterEach(done => {
    Product.collection.drop();
    done();
  });

  it("should list ALL blobs on /products GET", done => {
    chai
      .request(app)
      .get("/products")
      .end((err, res) => {
        res.should.have.status(200);
        res.type.should.equal("application/json");
        res.body.should.be.a("array");
        res.body[0].should.have.property("_id");
        res.body[0].should.have.property("name");
        res.body[0].should.have.property("price");
        res.body[0].should.have.property("discription");
        res.body[0].should.have.property("userId");
        res.body[0].name.should.equal("product1");
        done();
      });
  });

  it("should list a SINGLE product on /products/:id GET", done => {
    var newProduct = new Product({
      name: "product2",
      price: "price2",
      discription: "discription of product2",
      userId: "5ca4cf2703d730115c6ac81e"
    });

    newProduct.save((err, data) => {
      chai
        .request(app)
        .get("/products/" + data.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");

          res.body.should.have.property("_id");
          res.body.should.have.property("name");
          res.body.should.have.property("price");
          res.body.should.have.property("discription");
          res.body.should.have.property("userId");

          res.body._id.should.be.equal(data.id);
          res.body.name.should.be.equal("product2");
          res.body.price.should.be.equal("price2");
          res.body.discription.should.be.equal("discription of product2");
          res.body.userId.should.be.equal("5ca4cf2703d730115c6ac81e");
          done();
        });
    });
  });

  it("should add a SINGLE product on /products POST", function(done) {
    chai
      .request(app)
      .post("/products")
      .send({
        name: "product3",
        price: "price3",
        discription: "discription of product3",
        userId: "5ca4cf2703d730115c6ac81e"
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;

        res.body.should.be.a("object");

        res.body.should.have.property("_id");
        res.body.should.have.property("name");
        res.body.should.have.property("price");
        res.body.should.have.property("discription");
        res.body.should.have.property("userId");

        res.body.name.should.equal("product3");
        res.body.price.should.equal("price3");
        res.body.discription.should.equal("discription of product3");
        res.body.userId.should.equal("5ca4cf2703d730115c6ac81e");
        done();
      });
  });

  it("should update a SINGLE blob on  PUT /products/:id ", function(done) {
    chai
      .request(app)
      .get("/products")
      .end(function(err, res) {
        chai
          .request(app)
          .put("/products/" + res.body[0]._id)
          .send({ name: "productUpdate" })
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a("object");
            response.body.should.be.a("object");
            response.body.should.have.property("name");
            response.body.should.have.property("_id");
            response.body.name.should.equal("product1");
            done();
          });
      });
  });

  it("should delete a SINGLE blob on /products/:id DELETE", done => {
    chai
      .request(app)
      .get("/products")
      .end((err, res) => {
        chai
          .request(app)
          .delete("/products/" + res.body[0]._id)
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a("object");
            response.body.should.have.property("name");
            response.body.should.have.property("_id");
            response.body.name.should.equal("product1");
            done();
          });
      });
  });
});
