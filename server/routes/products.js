var express = require("express");
var router = express.Router();
let Product = require("../model/product.model");

router.post("/", (req, res) => {
  console.log("mon req.body : ", req.body);

  let product = new Product(req.body);
  product
    .save()
    .then(product => res.status(200).json(product))
    .catch(err => res.status(500).json({ error: err }));
});

router.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(product => res.status(200).json(product))
    .catch(err => res.status(500).json({ error: err }));
});

router.get("/", (req, res) => {
  Product.find(req.query.userId !== undefined ? req.query : {})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ error: "not found" }));
});

router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ error: "not found" }));
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ error: "not found" }));
});

module.exports = router;
