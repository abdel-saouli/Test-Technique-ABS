let express = require("express");
let router = express.Router();
let Product = require("../model/product.model");
let passport = require("../config/passport.config");

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

router.post("/", (req, res) => {
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
