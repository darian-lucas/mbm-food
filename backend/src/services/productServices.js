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
  let limit = query.limit ? query.limit : 100;
  delete query.limit;
  let products = await productModel.find({ idcate: idcate }).limit(limit);
  return products;
};

// Tạo sản phẩm mới
// exports.createProduct = async (name, idcate, description, variants, hot,view, slug) => {
//   const model = new productModel({ name, idcate, description, variants, hot, view, slug });
//   await model.save();
//   return model;
// };

// exports.createProduct = async ({ name, idcate, description, variants, hot, view, slug }) => {
//   const product = new productModel({
//     name,
//     idcate,
//     description, 
//     variants: variants?.length ? variants : [],
//     hot: hot || 0,
//     view: view || 0,
//     slug,
//   });

//   await product.save();
//   return product;
// };

exports.createProduct = async ({ name, idcate, description, variants, hot, slug }) => {
  try {
    const product = new productModel({
      name,
      idcate,
      description,
      variants: variants.map(variant => ({
        option: variant.option,
        price: variant.price,
        sale_price: variant.sale_price,
        image: variant.image,
      })),
      hot: hot || 0,
      slug
    });

    await product.save();
    return product;
  } catch (error) {
    throw error;
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (id, name, idcate, description, variants, hot,view,slug, status) => {
  const model = await productModel.findByIdAndUpdate(
    id,
    { name, idcate, description, variants, hot,view,slug, status },
    { new: true }
  );
  return model;
};

// Xóa sản phẩm
exports.deleteProduct = async (id) => {
  await productModel.deleteOne({ _id: id });
};

// lấy api của slug
exports.getBySlugProduct = async (slug) => {
  const product= await productModel.findOne({ slug }); 
  return product;
};
