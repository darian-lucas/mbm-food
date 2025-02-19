const express = require("express");
const {
  getAllCategories,
  getByIdCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const upload = require("../middleware/uploadImage");

const router = express.Router();

router.get('/', getAllCategories);

router.get('/:id', getByIdCategory);

router.post('/',upload.single("image"), createCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;
