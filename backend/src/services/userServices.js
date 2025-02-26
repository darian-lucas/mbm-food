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
    
    return { token };
};

// Lấy tất cả người dùng và phân trang
const getAllUsers = async (page = 1, limit = 5) => {
    try {
        page = Math.max(1, page);
        limit = Math.max(1, limit);

        const skip = (page - 1) * limit;
        console.log(`Querying users - Skip: ${skip}, Limit: ${limit}`);

        const users = await User.find().skip(skip).limit(limit);
        const totalUsers = await User.countDocuments();

        return {
            users,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page
        };
    } catch (error) {
        console.error("Database query error:", error);
        throw new Error("Không thể truy vấn danh sách người dùng");
    }
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

// Tìm người dùng theo username
const findUserByName = async (username) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error('Không tìm thấy người dùng');
    return user;
};

module.exports = { getAllUsers, deleteUser, updateUser, findUserByName, register, login };

