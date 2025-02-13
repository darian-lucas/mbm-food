const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//dang ki 
const register = async (userData) => {
    const user = new User(userData);
    await user.save();
    return { message: 'Đăng ký thành công!' };
};
//dang nhap
const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error('Tên đăng nhập không tồn tại');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Mật khẩu không chính xác');

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'defaultSecret', // Cung cấp fallback để tránh lỗi
        { expiresIn: '1h' }
    );
    
    return { token };
};

//lay tat ca
const getAllUsers = async () => {
    return await User.find();
};
//xoa tren id
const deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error('Người dùng không tồn tại');
    return { message: 'Xóa người dùng thành công' };
};
//update nguoi dung tren id
const updateUser = async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) throw new Error('Người dùng không tồn tại');
    return { message: 'Cập nhật thành công', user };
};
//tim nguoi dung tren name
const findUserByName = async (username) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error('Không tìm thấy người dùng');
    return user;
};

module.exports = { getAllUsers, deleteUser, updateUser, findUserByName, register, login };

