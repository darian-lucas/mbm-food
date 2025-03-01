const PostComment = require('../models/Post_Comment');

class PostCommentService {
    async createComment(userId, postId, comment) {
        return await PostComment.create({ id_user: userId, id_post: postId, comment });
    }

    async getAllComments() {
        return await PostComment.find().populate('id_user', 'username').populate('id_post', 'title');
    }

    async getCommentsByPost(postId) {
        return await PostComment.find({ id_post: postId }).populate('id_user', 'username');
    }

    async getCommentsByUser(userId) {
        return await PostComment.find({ id_user: userId }).populate('id_post', 'title');
    }

    async deleteComment(commentId, userId) {
        const comment = await PostComment.findById(commentId);
        if (!comment) throw new Error('Comment not found');
        if (comment.id_user.toString() !== userId) throw new Error('Not authorized to delete this comment');

        return await PostComment.findByIdAndDelete(commentId);
    }
}

module.exports = new PostCommentService();
