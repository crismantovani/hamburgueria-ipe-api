/* eslint-disable camelcase */
// GET, POST, PUT & DELETE
//  getOrders, getOrderById & addNewOrder,

const database = require('../db/models');

// GET All Orders
const getOrders = async (_, res) => {
  await database.Orders.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.result(400).json({
      message: 'Erro na requisição',
    }));
};

// GET Order by ID
const getOrderById = async (req, res) => {
  await database.Orders.findAll({
    where: { id: req.params.id },
  })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch(() => res.status(400).json({
      message: 'Erro na requisição',
    }));
};

// Adds a new Order
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
            message: 'Erro na requisição',
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
      message: 'Erro na requisição',
    }));
};

// Update Order
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
      message: 'Erro ao atualizar pedido!',
    }));
};

// Delete order
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
