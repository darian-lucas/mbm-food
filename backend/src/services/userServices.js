const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Đăng ký người dùng
const register = async (userData) => {
    const user = new User(userData);
    await user.save();
    return { message: 'Đăng ký thành công!' };
};

// Đăng nhập
const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Tên đăng nhập không tồn tại');
    if (!user.isActive) throw new Error('Tài khoản đã bị vô hiệu hóa');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Mật khẩu không chính xác');

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'defaultSecret',
        { expiresIn: '1h' }
    );

    return { token, userId: user._id };
};

// Đăng xuất (logout)
const logout = () => {
    return { message: 'Đăng xuất thành công' };
};

// Cập nhật mật khẩu
const updatePassword = async (userId, oldPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Người dùng không tồn tại');

    // Kiểm tra mật khẩu cũ
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) throw new Error('Mật khẩu cũ không chính xác');

    user.password = newPassword;

    await user.save();

    return { message: 'Cập nhật mật khẩu thành công' };
};



// Lấy tất cả người dùng và phân trang
const getAllUsers = async (page = 1, limit = 5) => {
    page = Math.max(1, page);
    limit = Math.max(1, limit);
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();

    return {
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page
    };
};

// Xóa người dùng theo ID
const deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error('Người dùng không tồn tại');
    return { message: 'Xóa người dùng thành công' };
};

// Cập nhật người dùng theo ID
const updateUser = async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) throw new Error('Người dùng không tồn tại');
    return { message: 'Cập nhật thành công', user };
};

// Thêm địa chỉ mới
const addAddress = async (req, res) => {
    try {
        const { userId } = req.user;
        const { address } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        // Kiểm tra và chuyển đổi address thành mảng nếu cần
        if (!Array.isArray(user.address)) {
            user.address = [];
        }

        user.address.push(address); 
        await user.save();

        res.status(200).json({ message: "Đã thêm địa chỉ mới", addresses: user.address });
    } catch (error) {
        console.error("Lỗi server:", error);
        res.status(500).json({ message: error.message });
    }
};



// Tìm người dùng theo username
const findUserByName = async (username) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error('Không tìm thấy người dùng');
    return user;
};

const findUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('Người dùng không tồn tại');
    return user;
};

module.exports = {
    getAllUsers,
    deleteUser,
    updateUser,
    findUserByName,
    findUserById,
    register,
    login,
    logout,
    updatePassword,
    addAddress
};

