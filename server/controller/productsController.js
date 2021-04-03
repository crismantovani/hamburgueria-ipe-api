/* eslint-disable camelcase */

const database = require('../db/models');

const getProducts = (_, res) => {
  database.Products.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.json({
      message: 'Erro na requisição',
    }));
};

const getProductById = (req, res) => {
  database.Products.findAll({ where: { id: req.params.productId } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.json({
      message: 'Erro ao achar usuário :(',
    }));
};

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
      message: 'Erro ao adicionar produto :(',
    }));
};

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
