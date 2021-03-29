const express = require('express');
const controller = require('../controller/usersController.js');

const router = express.Router();
const {
  getUsers,
  addNewUser,
  getUserById,
  updateUser,
  deleteUser,
} = controller;

router
  .route('/')
  .get(getUsers)
  .post(addNewUser);

router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;

// .get((req, res) => res.send('Teste'))
