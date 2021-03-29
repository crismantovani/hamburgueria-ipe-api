// GET, POST, PUT & DELETE
// getUsers, addNewUser, getUserById, updateUser, deleteUser,

// const express = require('express');
// const app = express();

const database = require('../db/models');

// GET All Users
const getUsers = (req, res) => {
  database.Users.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.json({
      message: 'Erro na requisição',
    }));
};

// GET User by ID
const getUserById = (req, res) => {
  database.Users.findAll({ where: { id: req.params.uid } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.json({
      message: 'Erro na requisição',
    }));
};

// CREATE a new User
const addNewUser = (req, res) => {
  const {
    name,
    email,
    password,
    role,
    restaurant,
  } = req.body;
  database.Users.create({
    name,
    email,
    password,
    role,
    restaurant,
  })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(() => res.json({
      message: 'Erro na requisição',
    }));
};

// Change user
const updateUser = (req, res) => {
  const {
    name,
    email,
    password,
    role,
    restaurant,
  } = req.body;
  database.Users.update(
    {
      name,
      email,
      password,
      role,
      restaurant,
    },
    { where: { id: req.params.uid } },
  )
    .then(() => {
      res.status(200).json({
        message: 'O usuário foi atualizado :)!',
      });
    })
    .catch(() => {
      res.json({
        message: 'Erro na requisição',
      });
    });
};

// DELETE USER
const deleteUser = (req, res) => {
  database.Users.destroy({ where: { id: req.params.uid } })
    .then(() => {
      res.status(200).json({
        message: 'Usuário excluído!',
      });
    })
    .catch(() => {
      res.json({
        message: 'Erro na requisição',
      });
    });
};

module.exports = {
  getUsers,
  addNewUser,
  getUserById,
  updateUser,
  deleteUser,
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
