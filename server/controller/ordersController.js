/* eslint-disable camelcase */

const database = require('../db/models');

const getOrders = async (_, res) => {
  await database.Orders.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.result(400).json({
      message: 'Erro ao listar pedidos :(',
    }));
};

const getOrderById = async (req, res) => {
  await database.Orders.findAll({
    where: { id: req.params.id },
  })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch(() => res.status(400).json({
      message: 'Erro ao achar usuário :(',
    }));
};

const addNewOrder = (req, res) => {
  const {
    user_id,
    client_name,
    table,
    status,
    processedAt,
  } = req.body;

  database.Orders.create({
    user_id,
    client_name,
    table,
    status,
    processedAt,
  })
    .then((result) => {
      req.body.products.map((product) => {
        const itemProduct = database.Products.findByPk(product.id);
        if (!itemProduct) {
          return res.status(400).json({
            message: 'Erro ao adicionar pedido :( - Sintaxe inválida',
          });
        }

        const itemOrders = {
          order_id: result.id,
          product_id: product.id,
          qtd: product.qtd,
        };
        database.ProductOrders.create(itemOrders);
        return res.status(200).json(result);
      });
    })
    .catch(() => res.status(400).json({
      message: 'Erro ao adicionar pedido :( - Sintaxe inválida',
    }));
};

const updateProduct = (req, res) => {
  const {
    status,
  } = req.body;
  database.Orders.update({
    status,
  }, { where: { id: req.params.id } })

    .then(() => {
      res.status(200).json({
        message: 'Pedido atualizado :)!',
      });
    })
    .catch(() => res.status(400).json({
      message: 'Erro ao atualizar pedido! :(',
    }));
};

const deleteOrder = (req, res) => {
  database.Orders.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.status(200).json({
        message: 'Pedido excluído',
      });
    })
    .catch(() => res.status(400).json({
      message: 'Erro ao apagar pedido',
    }));
};

module.exports = {
  getOrders,
  getOrderById,
  addNewOrder,
  updateProduct,
  deleteOrder,
};
