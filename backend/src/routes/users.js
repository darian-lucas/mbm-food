const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
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
    findUserById,
    updateAddress,
    toggleActiveStatus
} = require('../controllers/userController');

const router = express.Router();

// Đăng ký
router.post('/register', register);

// Đăng nhập
router.post('/login', login);

// Đăng xuất
router.post('/logout', logout);

// Các API yêu cầu xác thực người dùng
router.put('/update-password', authMiddleware, updatePassword);
router.post('/add-address', authMiddleware, addAddress);
// Cập nhật địa chỉ
router.put("/:userId/address/:addressId", authMiddleware, updateAddress);
// kich hoat!
router.patch("/toggle-active/:id", toggleActiveStatus);
// Lấy tất cả người dùng (có phân trang)
router.get('/', getAllUsers);

// Tìm kiếm người dùng theo tên
router.get('/search', findUserByName);

// Kích hoạt/Vô hiệu hóa người dùng
router.patch('/:id/activate', activateUser);

// Cập nhật người dùng theo ID
router.put('/:id', updateUser);

// Xóa người dùng theo ID
router.delete('/:id', deleteUser);

// Lấy thông tin người dùng theo ID
router.get('/:id', findUserById);

module.exports = router;
