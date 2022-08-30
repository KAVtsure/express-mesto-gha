const express = require('express');

const userRoutes = express.Router();
const {
  getUser, getUserById, createUser, updateUserProfile, updateAvatar,
} = require('../controllers/users');

userRoutes.post('/', createUser);

userRoutes.get('/', getUser);

userRoutes.patch('/me', updateUserProfile);

userRoutes.get('/:userId', getUserById);

userRoutes.patch('/me/avatar', updateAvatar);

module.exports = { userRoutes };
