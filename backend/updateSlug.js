require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../backend/src/config/db");
const Post = require("../backend/src/models/Post");
const slugify = require("slugify");

const updatePostSlugs = async () => {
  try {
    await connectDB();

    // Lấy tất cả bài viết chưa có slug
    const posts = await Post.find({ slug: { $exists: false } });

    let updatedCount = 0;

    for (const post of posts) {
      const slug = slugify(post.title || post.name, { lower: true, strict: true });

      if (slug) {
        await Post.updateOne({ _id: post._id }, { $set: { slug } });
        updatedCount++;
      }
    }

    console.log(`✔ Đã cập nhật slug cho ${updatedCount} bài viết.`);
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật slug:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

// Chạy script
updatePostSlugs();
