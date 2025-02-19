require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../backend/src/config/db"); 
const Product = require("../backend/src/models/ProductModel.js"); 

const removeStockFieldManually = async () => {
  try {
    await connectDB();

    // Lấy tất cả sản phẩm có chứa stock
    const products = await Product.find({ "variants.stock": { $exists: true } });

    console.log(`🔹 Tìm thấy ${products.length} sản phẩm cần cập nhật...`);

    for (let product of products) {
      // Lọc bỏ trường stock khỏi từng variant
      product.variants = product.variants.map(variant => {
        const { stock, ...updatedVariant } = variant.toObject();
        return updatedVariant;
      });

      await product.save(); // Lưu lại thay đổi
      console.log(`✔ Đã cập nhật sản phẩm: ${product.name}`);
    }

    console.log("🎉 Hoàn thành xóa stock trong tất cả sản phẩm!");
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật sản phẩm:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

removeStockFieldManually();
