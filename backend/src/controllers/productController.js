const productServices = require("../services/productServices");

// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res, next) => {
  try {
    const result = await productServices.getAllProducts();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Lấy chi tiết một sản phẩm
exports.getByIdProduct = async (req, res, next) => {
  try {
    let { id } = req.params;
    const result = await productServices.getByIdProduct(id);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// lấy sp theo danh mục
exports.getByCategory = async (req, res) => {
  try {
    const { idcate } = req.params;
    const query = req.query;
    const result = await productServices.getByCategory(idcate, query);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Thêm sản phẩm mới
exports.createProduct = async (req, res, next) => {
  try {
    let { name, idcate, description, variants, hot,view,slug, status } = req.body;
    const result = await productServices.createProduct(name, idcate, description, variants, hot,view,slug, status);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { name, idcate, description, variants , hot,view,slug, status} = req.body;
    const result = await productServices.updateProduct(id, name, idcate, description, variants, hot,view,slug, status);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res, next) => {
  try {
    let { id } = req.params;
    await productServices.deleteProduct(id);
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(404).json({ status: false });
  }
};

