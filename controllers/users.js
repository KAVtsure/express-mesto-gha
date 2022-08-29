const User = require('../models/user');
const {
  INCORRECT_REQ_DATA, DATA_NOT_FOUND, ERROR_SERVER, RES_OK,
} = require('../utils/codes');

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(RES_OK).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(INCORRECT_REQ_DATA).send({ message: 'Переданы некорректные данные при создании пользователя' });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    }
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(RES_OK).send(users);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(INCORRECT_REQ_DATA).send({ message: 'Переданы некорректные данные при создании пользователя' });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    }
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(DATA_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
      return;
    }
    res.status(RES_OK).send(user);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(INCORRECT_REQ_DATA).send({ message: 'Невалидный ID пользователя' });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    }
  }
};

const updateUserProfile = async (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      owner,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      res.status(DATA_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      return;
    }
    res.status(RES_OK).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(INCORRECT_REQ_DATA).send({ message: 'Переданы некорректные данные при обновлении профиля' });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    }
  }
};

const updateAvatar = async (req, res) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      owner,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      res.status(DATA_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      return;
    }
    res.status(RES_OK).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(INCORRECT_REQ_DATA).send({ message: 'Переданы некорректные данные при обновлении аватара' });
    } else {
      res.status(ERROR_SERVER).send({ message: 'Ошибка по умолчанию' });
    }
  }
};

module.exports = {
  getUser, getUserById, createUser, updateUserProfile, updateAvatar,
};
