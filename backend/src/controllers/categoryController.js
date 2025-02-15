const categoryServices = require("../services/categoryServices");

// get all categories
exports.getAllCategories = async (req, res, next) => {
  try {
    const result = await categoryServices.getAllCategories();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// lay 1 cate detail
exports.getByIdCategory = async (req, res, next) => {
  try {
    let { id } = req.params;
    const result = await categoryServices.getByIdCategory(id);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// post new categories
exports.createCategory = async (req, res, next) => {
  try {
    let { name, description } = req.body;
    const result = await categoryServices.createCategory(name, description);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { name, description } = req.body;
    const result = await categoryServices.updateCategory(id, name, description);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    let { id } = req.params;
    await categoryServices.deleteCategory(id);
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(404).json({ status: false });
  }
};
