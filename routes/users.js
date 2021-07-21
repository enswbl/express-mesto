const usersRouter = require('express').Router();

const {
  getUsers, getUserInfo, getSpecificUser, updateUserInfo, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/me', getUserInfo);

usersRouter.get('/users/:userId', getSpecificUser);

usersRouter.patch('/users/me', updateUserInfo);

usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = usersRouter;
