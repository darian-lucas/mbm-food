const express = require("express");
const {
  getAllCategories,
  getByIdCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.get('/', getAllCategories);

router.get('/:id', getByIdCategory);

router.post('/', createCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;
