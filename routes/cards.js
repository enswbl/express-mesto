const cardsRouter = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, removeLikeCard,
} = require('../controllers/cards');

const { userIdValidation, createCardValidation } = require('../middlewares/validation');

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', createCardValidation, createCard);

cardsRouter.delete('/cards/:cardId', userIdValidation, deleteCard);

cardsRouter.put('/cards/:cardId/likes', userIdValidation, likeCard);

cardsRouter.delete('/cards/:cardId/likes', userIdValidation, removeLikeCard);

module.exports = cardsRouter;
