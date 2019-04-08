const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  discription: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "users" }
});

module.exports = mongoose.model("product", ProductSchema);
