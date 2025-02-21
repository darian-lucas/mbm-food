require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../backend/src/config/db");
const Product = require("../backend/src/models/ProductModel.js");

const deleteProductsWithDescription = async () => {
  try {
    await connectDB();

    // Tìm và xóa tất cả sản phẩm có trường description
    const result = await Product.deleteMany({ description: { $exists: true } });

    console.log(`🗑 Đã xóa ${result.deletedCount} sản phẩm có description.`);
  } catch (error) {
    console.error("❌ Lỗi khi xóa sản phẩm:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

// Chạy script
deleteProductsWithDescription();
