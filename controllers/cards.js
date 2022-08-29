const Card = require('../models/card');
const {
  INCORRECT_REQ_DATA, DATA_NOT_FOUND, ERROR_SERVER, RES_OK,
} = require('../utils/codes');

const createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    res.status(RES_OK).send(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(INCORRECT_REQ_DATA).send({ message: 'Переданы некорректные данные при создании карточки' });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    }
  }
};

const getCard = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(RES_OK).send(cards);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(INCORRECT_REQ_DATA).send({ message: 'Переданы некорректные данные при создании карточки' });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    }
  }
};

const deleteCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      res.status(DATA_NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена' });
      return;
    }
    res.status(RES_OK).send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(INCORRECT_REQ_DATA).send({ message: 'Невалидный ID карточки' });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!card) {
      res.status(DATA_NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      return;
    }
    res.status(RES_OK).send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(INCORRECT_REQ_DATA).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    }
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!card) {
      res.status(DATA_NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      return;
    }
    res.status(RES_OK).send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(INCORRECT_REQ_DATA).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    }
  }
};

module.exports = {
  getCard, deleteCard, createCard, likeCard, dislikeCard,
};
