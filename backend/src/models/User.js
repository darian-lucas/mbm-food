const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const addressSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Họ tên người nhận
    phone: { type: String, required: true }, // Số điện thoại
    company: { type: String }, // Công ty (nếu có)
    address: { type: String, required: true }, // Địa chỉ chi tiết
    city: { type: String, required: true }, // Tỉnh/Thành phố
    district: { type: String, required: true }, // Quận/Huyện
    ward: { type: String, required: true }, // Phường/Xã
    zip: { type: String, required: true }, // Mã Zip
    default: { type: Boolean, default: false } // Địa chỉ mặc định
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
    role: { type: String, default: 'user', enum: ['user', 'admin', 'staff'] },
    address: { type: [addressSchema], default: [] }, // Mảng địa chỉ đầy đủ
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Mã hóa mật khẩu trước khi lưu
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);
