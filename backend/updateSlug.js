require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../backend/src/config/db");
const Product = require("../backend/src/models/ProductModel.js");

const updateProductStatus = async () => {
  try {
    await connectDB();

    const result = await Product.updateMany(
      {}, // Cập nhật tất cả sản phẩm
      { $set: { status: "Active" } }
    );

    console.log(`✔ Đã cập nhật ${result.modifiedCount} sản phẩm với status = "Active".`);
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật sản phẩm:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

// Chạy script
updateProductStatus();
