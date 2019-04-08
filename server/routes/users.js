let express = require("express");
let router = express.Router();
let User = require("../model/user.model");

router.post("/", (req, res) => {
  let user = new User(req.body);
  user
    .save()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err }));
});

router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body).then(user =>
    User.findById(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({ error: err }))
  );
});

router.get("/", (req, res) => {
  User.find({})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ error: "not found" }));
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ error: "not found" }));
});

router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ error: "not found" }));
});

module.exports = router;
