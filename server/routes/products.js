const express = require('express');
const controller = require('../controller/productsController.js');

const router = express.Router();
const {
  getProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = controller;

router
  .route('/')
  .get(getProducts)
  .post(addNewProduct);

router
  .route('/:productId')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
