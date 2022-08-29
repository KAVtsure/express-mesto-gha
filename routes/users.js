const express = require('express');

const userRoutes = express.Router();
const {
  getUser, getUserById, createUser, updateUserProfile, updateAvatar,
} = require('../controllers/users');

userRoutes.post('/', express.json(), createUser);

userRoutes.get('/', express.json(), getUser);

userRoutes.get('/:userId', express.json(), getUserById);

userRoutes.patch('/me', express.json(), updateUserProfile);

userRoutes.patch('/me/avatar', express.json(), updateAvatar);

module.exports = { userRoutes };
