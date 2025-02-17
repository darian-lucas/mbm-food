const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sale_price: { type: Number, default: 0 },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  idcate: { type: ObjectId, ref: "category" },
});

module.exports = mongoose.model("product", productSchema);
