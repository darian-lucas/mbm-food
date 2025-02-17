const postService = require('../services/postServices');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLimitedPosts = async (req, res) => {
    try {
        const posts = await postService.getLimitedPosts(4);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getNewestPosts = async (req, res) => {
    try {
        const posts = await postService.getNewestPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getHotPosts = async (req, res) => {
    try {
        const posts = await postService.getHotPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getNewestFourPosts = async (req, res) => {
    try {
        const posts = await postService.getNewestFourPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, content, summary, imageSummary, author, status, hot, view } = req.body;
        
        // Kiểm tra xem dữ liệu cần thiết có đầy đủ không
        if (!title || !content || !author) {
            return res.status(400).json({ message: 'Thiếu dữ liệu cần thiết' });
        }

        const newPost = await postService.createPost({
            title,
            content,
            summary,
            imageSummary,
            author,
            status,
            hot,
            view
        });

        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { title, content, summary, imageSummary, author, status, hot } = req.body;

        const updatedPost = await postService.updatePost(req.params.id, {
            title,
            content,
            summary,
            imageSummary,
            author,
            status,
            hot
        });

        if (!updatedPost) return res.status(404).json({ message: 'Không tìm thấy bài viết' });

        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await postService.deletePost(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        res.json({ message: 'Bài viết đã được xóa' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
