require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../backend/src/config/db");
const Product = require("../backend/src/models/ProductModel.js");

const addDescriptionToProducts = async () => {
  try {
    await connectDB();

   
    const result = await Product.updateMany(
      { description: { $exists: false } }, 
      { $set: { description: "abc" } }
    );

    console.log(`✔ Đã cập nhật ${result.modifiedCount} sản phẩm với description = "abc".`);
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật sản phẩm:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

// Chạy script
addDescriptionToProducts();
