require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../backend/src/config/db");
const Register = require("../backend/src/models/RegisterModel");

const renameNoteToCancelReason = async () => {
  try {
    await connectDB();

    const result = await Register.updateMany(
      { note: { $exists: true } },
      { $rename: { note: "cancel_reason" } }
    );

    console.log(`✔ Đã đổi tên trường note thành cancel_reason cho ${result.modifiedCount} đăng kí.`);
  } catch (error) {
    console.error("❌ Lỗi khi đổi tên trường:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

// Chạy script
renameNoteToCancelReason();
