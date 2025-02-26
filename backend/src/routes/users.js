const express = require('express');
const { 
    register, 
    login, 
    logout, 
    updatePassword, 
    addAddress, 
    getAllUsers, 
    deleteUser, 
    updateUser, 
    findUserByName, 
    findUserById
} = require('../controllers/userController');

const router = express.Router();

// Đăng ký
router.post('/register', register);

// Đăng nhập
router.post('/login', login);

// Đăng xuất
router.post('/logout', logout);

// Cập nhật mật khẩu (yêu cầu xác thực)
router.put('/update-password', updatePassword);

// Thêm địa chỉ mới
router.post('/add-address', addAddress);

// Lấy tất cả người dùng (có phân trang)
router.get('/', getAllUsers);

// Tìm kiếm người dùng theo tên
router.get('/search', findUserByName);

// Cập nhật người dùng theo ID
router.put('/:id', updateUser);

// Xóa người dùng theo ID
router.delete('/:id', deleteUser);

// Lấy thông tin người dùng theo ID
router.get('/:id', findUserById);

module.exports = router;
