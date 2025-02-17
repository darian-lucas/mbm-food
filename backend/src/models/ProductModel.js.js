const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    idcate: { type: ObjectId, ref: "category" },
    description: [
      {
        summary: { type: String },
        title: { type: String },
        content: { type: String },
        image: { type: String },
      },
    ],
    variants: [
      {
        option: { type: String },
        price: { type: Number, required: true },
        sale_price: { type: Number, default: 0 },
        image: { type: String, required: true },
      },
    ],
    hot: { type: Number, default: 0 },
    view: { type: Number, default: 0 },
  },

  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
