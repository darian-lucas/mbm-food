const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
