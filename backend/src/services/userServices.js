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
    // console.log("User từ DB:", user); // ✅ Kiểm tra user có tồn tại không
    if (!user) throw new Error("Người dùng không tồn tại");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Mật khẩu không đúng");
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { token, user }; // ✅ Trả về cả user
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
// Update địa chỉ
const updateAddress = async (userId, addressId, updatedAddress) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("Người dùng không tồn tại");
    }

    // Tìm địa chỉ theo `addressId`
    const addressIndex = user.address.findIndex(addr => addr._id.toString() === addressId);
    if (addressIndex === -1) {
        throw new Error("Địa chỉ không tồn tại");
    }

    // Cập nhật thông tin địa chỉ
    user.address[addressIndex] = { ...user.address[addressIndex], ...updatedAddress };

    // Nếu có địa chỉ mặc định, đặt lại tất cả trước khi cập nhật
    if (updatedAddress.default) {
        user.address.forEach(addr => (addr.default = false));
        user.address[addressIndex].default = true;
    }

    await user.save();
    return user.address;
};



module.exports = { addAddress ,updatePassword, getAllUsers, deleteUser, updateUser, findUserByName, register, login, findUserById,updateAddress  };
