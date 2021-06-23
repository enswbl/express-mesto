const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .orFail(new Error('Нет пользователей'))
    .then((users) => res.send({ users }))

    .catch((err) => {
      if (err.message === 'Нет пользователей') {
        res.status(200).send({ message: err.message });
        return;
      }

      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const getSpecificUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('Пользователь с таким ID не найден'))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Пользователь с таким ID не найден') {
        res.status(404).send({ message: 'Пользователь с таким ID не найден' });
        return;
      }

      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUserInfo = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about },
    {
      new: true,
      runValidators: true,
      // upsert: true,
    })
    .orFail(new Error('Пользователь с таким ID не найден'))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }

      if (err.message === 'Пользователь с таким ID не найден') {
        res.status(404).send({ message: err.message });
        return;
      }

      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
      // upsert: true,
    })
    .orFail(new Error('Пользователь с таким ID не найден'))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }

      if (err.message === 'Пользователь с таким ID не найден') {
        res.status(404).send({ message: err.message });
        return;
      }

      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  getSpecificUser,
  createUser,
  updateUserInfo,
  updateAvatar,
};
