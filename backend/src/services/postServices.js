const Post = require('../models/Post');

exports.getAllPosts = async () => {
    return await Post.find();
};

exports.getLimitedPosts = async (limit) => {
    return await Post.find().limit(limit);
};

exports.getPostById = async (id) => {
    return await Post.findById(id);
};

exports.getNewestPosts = async () => {
    return await Post.find().sort({ create_at: -1 });
};

exports.getHotPosts = async () => {
    return await Post.find({ status: 1 }).sort({ create_at: -1 });  // 'status: 1' là bài viết "kích hoạt"
};

exports.getNewestFourPosts = async () => {
    return await Post.find().sort({ create_at: -1 }).limit(4);
};

exports.createPost = async (postData) => {
    const post = new Post({
        title: postData.title,
        content: postData.content,
        summary: postData.summary,  // Giữ lại tóm tắt nếu có
        imageSummary: postData.imageSummary,  // Thêm trường imageSummary
        create_at: postData.create_at || Date.now(),
        status: postData.status || 1,  // Mặc định là "kích hoạt"
        author: postData.author,
        view: postData.view || 0,
        hot: postData.hot || 0
    });

    return await post.save();
};

exports.updatePost = async (id, postData) => {
    // Cập nhật trường imageSummary nếu cần thiết
    return await Post.findByIdAndUpdate(id, {
        title: postData.title,
        content: postData.content,
        summary: postData.summary,  // Giữ lại tóm tắt nếu có
        imageSummary: postData.imageSummary,  // Thêm trường imageSummary
        status: postData.status,
        author: postData.author,
        hot: postData.hot,
    }, { new: true });
};

exports.deletePost = async (id) => {
    return await Post.findByIdAndDelete(id);
};
