const authService = require('../services/userServices');

// Đăng ký tài khoản
const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Đăng nhập trả về token và userId
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.login(email, password); // Nhận user thay vì userId

        res.status(200).json({ 
            token, 
            userId: user._id, 
            role: user.role // Trả về role
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Lấy tất cả người dùng
const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

       

        const result = await authService.getAllUsers(page, limit);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching users:", error); // Log lỗi chi tiết
        res.status(500).json({ message: "Lỗi lấy danh sách người dùng", error: error.message });
    }
};



// Xóa người dùng theo ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await authService.deleteUser(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật người dùng theo ID
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = await authService.updateUser(id, updateData);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Tìm người dùng theo tên
const findUserByName = async (req, res) => {
    try {
        const { username } = req.query;
        const user = await authService.findUserByName(username);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAllUsers, deleteUser, updateUser, findUserByName, register, login };
