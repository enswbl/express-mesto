const usersRouter = require('express').Router();

const {
  getUsers, getSpecificUser, createUser, updateUserInfo, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/:userId', getSpecificUser);

usersRouter.post('/users', createUser);

usersRouter.patch('/users/me', updateUserInfo);

usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = usersRouter;
