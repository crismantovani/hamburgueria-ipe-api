/* eslint-disable camelcase */
// GET, POST, PUT & DELETE
//   getProducts, getProductsById, addNewProduct, getProduct, updateProduct, deleteProduct,

const database = require('../db/models');

// GET All Products
const getProducts = (_, res) => {
  database.Products.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.json({
      message: 'Erro na requisição',
    }));
};

// GET Product by ID
const getProductById = (req, res) => {
  database.Products.findAll({ where: { id: req.params.productId } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.json({
      message: 'Erro na requisição',
    }));
};

// Adds a new Product
const addNewProduct = (req, res) => {
  const {
    name,
    price,
    flavor,
    complement,
    image,
    type,
    sub_type,
  } = req.body;
  database.Products.create({
    name,
    price,
    flavor,
    complement,
    image,
    type,
    sub_type,
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(() => res.json({
      message: 'Erro na requisição',
    }));
};

// Update a Product
const updateProduct = (req, res) => {
  const {
    name,
    price,
    flavor,
    complement,
    image,
    type,
    sub_type,
  } = req.body;
  database.Products.update(
    {
      name,
      price,
      flavor,
      complement,
      image,
      type,
      sub_type,
    },
    { where: { id: req.params.productId } },
  )
    .then(() => {
      res.status(200).json({
        message: 'Produto atualizado com sucesso :)!',
      });
    })
    .catch(() => {
      res.json({
        message: 'Erro ao atualizar produto :(',
      });
    });
};

// Delete a product
const deleteProduct = (req, res) => {
  database.Products.destroy({ where: { id: req.params.productId } })
    .then(() => {
      res.status(200).json({
        message: 'Produto excluído com sucesso :)!',
      });
    })
    .catch(() => {
      res.json({
        message: 'Erro ao excluir produto :(!',
      });
    });
};

module.exports = {
  getProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};

// Respostas de sucesso

// 200 OK
// 201 Created
// 202 Accepted
// 204 No Content

// Respostas de erro do Cliente

// 400 Bad Request
// 401 Unauthorized
// 403 Forbidden
// 404 Not Found
// 408 Request Timeout

// Respostas de erro do Servidor

// 500 Internal Server Error
// 502 Bad Gateway
// 503 Service Unavailable

// https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status#respostas_informativas
