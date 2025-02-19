require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../backend/src/config/db");
const Category = require("../backend/src/models/CategoryModel.js");

const addCreatedAtToCategories = async () => {
  try {
    await connectDB();

    // Lọc danh mục chưa có createdAt
    const categories = await Category.find({ createdAt: { $exists: false } });

    console.log(`🔹 Tìm thấy ${categories.length} danh mục cần thêm createdAt...`);

    for (let category of categories) {
      category.createdAt = category.updatedAt || new Date(); // Lấy updatedAt hoặc ngày hiện tại
      await category.save();
      console.log(`✔ Đã cập nhật danh mục: ${category.name}`);
    }

    console.log("🎉 Hoàn thành thêm trường createdAt vào tất cả danh mục!");
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật danh mục:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

// Chạy script
addCreatedAtToCategories();
