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
// exports.createProduct = async (req, res, next) => {
//   try {
//     let { name, idcate, description, variants, hot,view,slug } = req.body;
//      let image = req.file ? `${req.file.filename}` : null;
//     const result = await productServices.createProduct(name, idcate, description, variants, hot,view,slug);
//     res.status(200).json({ data: result });
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

// exports.createProduct = async (req, res, next) => {
//   try {
//     let { name, idcate, description, hot, view, slug, price, sale_price } =
//       req.body;
//     let image = req.file ? `${req.file.filename}` : null;

//     const variants = [
//       {
//         option: "",
//         image: image || "",
//         price: parseFloat(price) || 0,
//         sale_price: parseFloat(sale_price) || 0,
//       },
//     ];

//     const result = await productServices.createProduct({
//       name,
//       idcate,
//       description,
//       variants,
//       hot: hot ? parseInt(hot) : 0,
//       view: view ? parseInt(view) : 0,
//       slug,
//     });

//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.createProduct = async (req, res, next) => {
//   try {
//     let { name, idcate, description, hot, view, slug, price, sale_price } = req.body;
//     let image = req.file ? `${req.file.filename}` : "";

//     let variants = [];
//     if (price && sale_price) {
//       variants.push({
//         option: "",
//         image: image,
//         price: parseFloat(price),
//         sale_price: parseFloat(sale_price),
//       });
//     }

//     const result = await productServices.createProduct({
//       name,
//       idcate,
//       description,
//       variants,
//       hot: hot ? parseInt(hot) : 0,
//       view: view ? parseInt(view) : 0,
//       slug,
//     });

//     res.status(200).json({ success: true, data: result });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.createProduct = async (req, res) => {
  try {
    const { name, idcate, description, hot, view, slug } = req.body;

    // Extract variants data
    const variants = [];
    let i = 0;
    while (req.body[`variants[${i}][option]`] !== undefined) {
      const variant = {
        option: req.body[`variants[${i}][option]`] || "",
        price: parseFloat(req.body[`variants[${i}][price]`] || "0"),
        sale_price: parseFloat(req.body[`variants[${i}][sale_price]`] || "0"),
        image: req.files[`variants[${i}][image]`] ? req.files[`variants[${i}][image]`][0].filename : "", // Lưu tên file hình ảnh
      };
      variants.push(variant);
      i++;
    }

    const result = await productServices.createProduct({
      name,
      idcate,
      description,
      variants,
      hot: parseInt(hot) || 0,
      view: parseInt(view) || 0,
      slug
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { name, idcate, description, variants, hot, view, slug, status } =
      req.body;
    const result = await productServices.updateProduct(
      id,
      name,
      idcate,
      description,
      variants,
      hot,
      view,
      slug,
      status
    );
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

// lấy API của slug
exports.getBySlugProduct = async (req, res, next) => {
  try {
    let { slug } = req.params;
    const result = await productServices.getBySlugProduct(slug);

    if (!result) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
