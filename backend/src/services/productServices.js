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

exports.updateProduct = async (id, { name, idcate, description, variants, hot, slug }) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          idcate,
          description,
          hot,
          slug,
          variants: variants.map(variant => ({
            option: variant.option || "",
            price: parseFloat(variant.price || "0"),
            sale_price: parseFloat(variant.sale_price || "0"),
            image: variant.image || "",
          })),
        },
      },
      { new: true } // Trả về bản ghi đã cập nhật
    );

    if (!updatedProduct) {
      throw new Error("Sản phẩm không tồn tại");
    }

    return updatedProduct;
  } catch (error) {
    throw error;
  }
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
