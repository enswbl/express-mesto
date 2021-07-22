const cardsRouter = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, removeLikeCard,
} = require('../controllers/cards');

const { cardIdValidation, createCardValidation } = require('../middlewares/validation');

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', createCardValidation, createCard);

cardsRouter.delete('/cards/:cardId', cardIdValidation, deleteCard);

cardsRouter.put('/cards/:cardId/likes', cardIdValidation, likeCard);

cardsRouter.delete('/cards/:cardId/likes', cardIdValidation, removeLikeCard);

module.exports = cardsRouter;
