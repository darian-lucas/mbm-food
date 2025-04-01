require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../backend/src/config/db");
const Register = require("../backend/src/models/RegisterModel");

const updateProductFlags = async () => {
  try {
    await connectDB();

    // Cập nhật tất cả sản phẩm chưa có trường 'flag' hoặc có giá trị khác true
    const result = await Register.updateMany(
      { flag: { $exists: false } }, // Chỉ cập nhật nếu trường flag chưa tồn tại
      { $set: {  note: ""} }
    );

    console.log(`✔ Đã cập nhật trường note cho ${result.modifiedCount} đăng kí.`);
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật flag:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

// Chạy script
updateProductFlags();
