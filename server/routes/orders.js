const express = require('express');
const controller = require('../controller/ordersController.js');

const router = express.Router();
const {
  getOrders,
  getOrderById,
  addNewOrder,
} = controller;

router
  .route('/')
  .get(getOrders)
  .post(addNewOrder);

router
  .route('/:orderId')
  .get(getOrderById)
  .put()
  .delete();

module.exports = router;
