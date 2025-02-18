require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../backend/src/config/db"); 
const Product = require("../backend/src/models/ProductModel.js"); 

const updateStockAndStatus = async () => {
  try {
    await connectDB(); 

   
    const products = await Product.find();

    console.log(`🔹 Tìm thấy ${products.length} sản phẩm cần cập nhật...`);

   
    for (let product of products) {
      
      product.variants.forEach(variant => {
        if (!variant.stock) {
          variant.stock = 100; 
        }
      });

   
      if (!product.status) {
        product.status = "active"; 
      }

    
      await product.save();

      console.log(`✔ Đã cập nhật sản phẩm: ${product.name}`);
    }

    console.log("🎉 Hoàn thành cập nhật stock và status!");
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật stock và status:", error.message);
  } finally {
    mongoose.disconnect(); 
  }
};

// Chạy script
updateStockAndStatus();
