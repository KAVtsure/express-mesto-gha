const express = require('express');

const cardRoutes = express.Router();
const {
  getCard, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRoutes.post('/', createCard);

cardRoutes.get('/', getCard);

cardRoutes.delete('/:cardId', deleteCard);

cardRoutes.put('/:cardId/likes', likeCard);

cardRoutes.delete('/:cardId/likes', dislikeCard);

module.exports = { cardRoutes };
