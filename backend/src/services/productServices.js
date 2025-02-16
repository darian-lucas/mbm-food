const productModel = require("../models/ProductModel.js");

// Lấy tất cả sản phẩm
exports.getAllProducts = async () => {
  const products = await productModel.find({});
  return products;
};

// Lấy sản phẩm chi tiết
exports.getByIdProduct = async (id) => {
  const products = await productModel.findById(id);
  return products;
};

// lấy sp theo danh mục
exports.getByCategory = async (idcate, query) => {
  let limit = query.limit ? query.limit : 4;
  delete query.limit;
  let products = await productModel.find({ idcate: idcate }).limit(limit);
  return products;
};

// Tạo sản phẩm mới
exports.createProduct = async (name, idcate, description, variants) => {
  const model = new productModel({ name, idcate, description, variants });
  await model.save();
  return model;
};

// Cập nhật sản phẩm
exports.updateProduct = async (id, name, idcate, description, variants) => {
  const model = await productModel.findByIdAndUpdate(
    id,
    { name, idcate, description, variants },
    { new: true }
  );
  return model;
};

// Xóa sản phẩm
exports.deleteProduct = async (id) => {
  await productModel.deleteOne({ _id: id });
};