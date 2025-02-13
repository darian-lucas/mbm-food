const express = require('express');
const { register, login, getAllUsers, deleteUser, updateUser, findUserByName } = require('../controllers/userController');

const router = express.Router();

// Dang ki
router.post('/register', register);

// dang nhap
router.post('/login', login);

// Lấy tất cả người dùng
router.get('/', getAllUsers);

// Xóa người dùng
router.delete('/:id', deleteUser);

// Cập nhật người dùng
router.put('/:id', updateUser);

// Tìm kiếm người dùng theo tên
router.get('/search', findUserByName);

module.exports = router;