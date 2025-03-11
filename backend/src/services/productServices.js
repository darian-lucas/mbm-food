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
// exports.getByCategory = async (idcate, query) => {
//   let limit = query.limit ? query.limit : 100;
//   delete query.limit;
//   let products = await productModel.find({ idcate: idcate }).limit(limit);
//   return products;
// };

exports.getByCategory = async (idcate, query) => {
  let limit = query.limit ? query.limit : 100;
  delete query.limit;
  
  // Tạo đối tượng filter
  let filter = { idcate: idcate };
  
  // Lọc theo khoảng giá
  if (query.minPrice || query.maxPrice) {
    let priceFilter = {};
    if (query.minPrice) {
      priceFilter['variants.price'] = { ...priceFilter['variants.price'], $gte: Number(query.minPrice) };
    }
    if (query.maxPrice) {
      priceFilter['variants.price'] = { ...priceFilter['variants.price'], $lte: Number(query.maxPrice) };
    }
    Object.assign(filter, priceFilter);
  }
  
  // Lọc theo kích thước
  if (query.size) {
    filter['variants.option'] = { $regex: query.size, $options: 'i' };
  }
  
  // Sắp xếp
  let sort = {};
  if (query.sort) {
    switch(query.sort) {
      case 'price-asc':
        sort = { 'variants.price': 1 };
        break;
      case 'price-desc':
        sort = { 'variants.price': -1 };
        break;
      case 'name-az':
        sort = { name: 1 };
        break;
      case 'name-za':
        sort = { name: -1 };
        break;
      case 'newest':
        sort = { createdAt: -1 };
        break;
    }
  }
  
  let products;
  if (Object.keys(sort).length > 0) {
    products = await productModel.find(filter).sort(sort).limit(limit);
  } else {
    products = await productModel.find(filter).limit(limit);
  }
  
  return products;
};

exports.createProduct = async ({
  name,
  idcate,
  description,
  variants,
  hot,
  slug,
}) => {
  try {
    const product = new productModel({
      name,
      idcate,
      description,
      variants: variants.map((variant) => ({
        option: variant.option,
        price: variant.price,
        sale_price: variant.sale_price,
        image: variant.image,
      })),
      hot: hot || 0,
      slug,
    });

    await product.save();
    return product;
  } catch (error) {
    throw error;
  }
};

exports.updateProduct = async (
  id,
  { name, idcate, description, variants, hot, slug }
) => {
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
          variants: variants.map((variant) => ({
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
  const product = await productModel.findOne({ slug });
  return product;
};

exports.updateStatusProduct = async (id, status, flag) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { status, flag },
      { new: true }
    );

    if (!updatedProduct) {
      throw new Error("Sản phẩm không tồn tại");
    }

    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

exports.updateViewProduct = async (id, view) => {
  try {
    const updateView = await productModel.findByIdAndUpdate(
      id,
      { view },
      { new: true }
    );
    return updateView;
  } catch (error) {
    throw error;
  }
};
