const express = require("express");
const {
 getAllProducts,
 getByIdProduct,
 createProduct,
 updateProduct,
 deleteProduct,
 getByCategory,
 filterProducts,
 getBySlugProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get('/', getAllProducts);

router.get('/:id', getByIdProduct);

router.get('/categories/:idcate', getByCategory);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

router.get('/slug/:slug', getBySlugProduct);

module.exports = router;
