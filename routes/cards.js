const cardsRouter = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, removeLikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', createCard);

cardsRouter.delete('/cards/:cardId', deleteCard);

cardsRouter.put('/cards/:cardId/likes', likeCard);

cardsRouter.delete('/cards/:cardId/likes', removeLikeCard);

module.exports = cardsRouter;
