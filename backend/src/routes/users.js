const express = require('express');
const { 
    register, 
    login, 
    getAllUsers, 
    deleteUser, 
    updateUser, 
    findUserByName, 
    findUserById, 
    activateUser 
} = require('../controllers/userController');

const router = express.Router();

// Đăng ký
router.post('/register', register);

// Đăng nhập
router.post('/login', login);

// Lấy tất cả người dùng
router.get('/', getAllUsers);

// Lấy người dùng theo ID
// router.get('/:id', findUserById);

// Tìm kiếm người dùng theo tên
router.get('/search', findUserByName);

// Lấy người dùng theo ID
router.get('/:id', findUserById);

// Cập nhật người dùng
router.put('/:id', updateUser);

// Kích hoạt/Vô hiệu hóa người dùng
router.patch('/:id/activate', activateUser);

// Xóa người dùng
router.delete('/:id', deleteUser);

module.exports = router;
