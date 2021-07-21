const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail(new NotFoundError('Карточки не найдены'))
    .then((cards) => res.send({ cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Карточка с таким ID не найдена'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Это карточка другого пользователя');
      }

      Card.findByIdAndRemove(req.params.cardId)
        .orFail(new NotFoundError('Карточка с таким ID не найдена'))
        // eslint-disable-next-line no-shadow
        .then((card) => res.send({ card }))
        .catch(next);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail(new NotFoundError('Карточка с таким ID не найдена'))
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Карточка с таким ID не найдена');
      } else {
        next(err);
      }
    });
};

const removeLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } },
    { new: true })
    .orFail(new NotFoundError('Карточка с таким ID не найдена'))
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Карточка с таким ID не найдена');
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  removeLikeCard,
};
