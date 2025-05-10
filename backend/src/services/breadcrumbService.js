const Product = require("../models/ProductModel.js");
const News = require("../models/Post.js");
const Categories = require("../models/CategoryModel.js");

const getNameBySlug = async (slug) => {
  // Tìm trong sản phẩm
  const product = await Product.findOne({ slug }).select("name");
  if (product) return product.name;

  // Tìm trong tin tức
  const news = await News.findOne({ slug }).select("title");
  if (news) return news.title;

  const categories = await Categories.findOne({ slug }).select("name");
  if (categories) return categories.name;

  return null;
};

module.exports = {
  getNameBySlug,
};
