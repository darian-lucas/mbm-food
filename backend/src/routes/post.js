const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

// Lấy tất cả bài viết
router.get('/posts', postController.getAllPosts);

// Lấy bài viết giới hạn số lượng 4 bài
router.get('/posts/limit/4', postController.getLimitedPosts);

// Lấy bài viết theo id
router.get('/posts/:id', postController.getPostById);

// Lấy các bài viết mới nhất
router.get('/posts/newest', postController.getNewestPosts);

// Lấy các bài viết hot
router.get('/posts/hot', postController.getHotPosts);

// Lấy 4 bài viết mới nhất
router.get('/posts/newest/4', postController.getNewestFourPosts);

// Tạo bài viết mới
router.post('/posts', postController.createPost);

// Cập nhật bài viết theo id
router.put('/posts/:id', postController.updatePost);

// Xóa bài viết theo id
router.delete('/posts/:id', postController.deletePost);

module.exports = router;
