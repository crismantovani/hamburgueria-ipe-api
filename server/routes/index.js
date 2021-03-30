const express = require('express');

const app = express();
const users = require('./users');
const products = require('./products');
// const orders = require('./orders');

app.use('/users', users);
app.use('/products', products);
// app.use('/orders', orders);

module.exports = app;

// DEFAULT
// const { Router } = require('express');
// const ExampleRouter = require('./ExampleRouter');

// const router = Router();

// // aqui vai todas as rotas
// router.use('/example', ExampleRouter);

// module.exports = router;
