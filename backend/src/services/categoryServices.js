const categoryModel = require("../models/CategoryModel");

exports.getAllCategories = async () => {
  const categories = await categoryModel.find({});
  return categories;
};

exports.getByIdCategory = async (id) => {
  const categories = await categoryModel.findById(id);
  return categories;
};

exports.createCategory = async (name, description) => {
  const model = new categoryModel({ name, description });
  await model.save();
  return model;
};

exports.updateCategory = async (id, name, description) => {
  const model = await categoryModel.findByIdAndUpdate(id, {
    name,
    description,
  });
  return model;
};

exports.deleteCategory = async (id) => {
  await categoryModel.deleteOne({ _id: id });
};
