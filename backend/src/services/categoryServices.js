const categoryModel = require("../models/CategoryModel");

exports.getAllCategories = async () => {
  const categories = await categoryModel.find({});
  return categories;
};

exports.getByIdCategory = async (id) => {
  const categories = await categoryModel.findById(id);
  return categories;
};

exports.createCategory = async (name, description, slug,image) => {
  const model = new categoryModel({ name, description, slug,image });
  await model.save();
  return model;
};

exports.updateCategory = async (id, name, description,slug,image) => {
  const model = await categoryModel.findByIdAndUpdate(id, {
    name,
    description,
    slug,
    image
  });
  return model;
};

exports.deleteCategory = async (id) => {
  await categoryModel.deleteOne({ _id: id });
};

