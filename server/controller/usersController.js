const database = require('../db/models');

const getUsers = (_, res) => {
  database.Users.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.json({
      message: 'Erro na requisição',
    }));
};

const getUserById = (req, res) => {
  database.Users.findAll({ where: { id: req.params.userId } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => res.json({
      message: 'Erro na requisição',
    }));
};

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
    { where: { id: req.params.userId } },
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

const deleteUser = (req, res) => {
  database.Users.destroy({ where: { id: req.params.userId } })
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
