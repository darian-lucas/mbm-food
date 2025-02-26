const express = require("express");
const {
  getAllProducts,
  getByIdProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getByCategory,
  getBySlugProduct,
} = require("../controllers/productController");

const upload = require("../middleware/uploadImage");

const multerFields = [];
const MAX_VARIANTS = 10; 

for (let i = 0; i < MAX_VARIANTS; i++) {
  multerFields.push({ name: `variants[${i}][image]` });
}

const router = express.Router();

router.get('/', getAllProducts);

router.get('/:id', getByIdProduct);

router.get('/categories/:idcate', getByCategory);

// router.post(
//   "/",
//   upload.fields([
//     { name: "variants[0][image]" },
//     { name: "variants[1][image]" },
//   ]),
//   createProduct
// );


router.post('/', upload.fields(multerFields), createProduct);

router.put('/:id', upload.fields(multerFields), updateProduct);

router.delete('/:id', deleteProduct);

router.get('/slug/:slug', getBySlugProduct);

module.exports = router;
