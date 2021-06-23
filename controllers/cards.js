const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .orFail(new Error('Нет карточек'))
    .then((cards) => res.send({ cards }))
    .catch((err) => {
      if (err.message === 'Нет карточек') {
        res.status(200).send({ message: err.message });
        return;
      }

      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }

      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('Карточка с таким ID не найдена'))
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Карточка с таким ID не найдена') {
        res.status(404).send({ message: 'Карточка с таким ID не найдена' });
        return;
      }

      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail(new Error('Карточка с таким ID не найдена'))
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Карточка с таким ID не найдена') {
        res.status(400).send({ message: 'Карточка с таким ID не найдена' });
        return;
      }

      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const removeLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } },
    { new: true })
    .orFail(new Error('Карточка с таким ID не найдена'))
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Карточка с таким ID не найдена') {
        res.status(400).send({ message: 'Карточка с таким ID не найдена' });
        return;
      }

      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  removeLikeCard,
};
