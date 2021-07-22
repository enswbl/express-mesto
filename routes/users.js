const usersRouter = require('express').Router();

const {
  getUsers, getUserInfo, getSpecificUser, updateUserInfo, updateAvatar,
} = require('../controllers/users');

const { userIdValidation, updateUserInfoValidation, updateAvatarValidation } = require('../middlewares/validation');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/me', getUserInfo);

usersRouter.get('/users/:userId', userIdValidation, getSpecificUser);

usersRouter.patch('/users/me', updateUserInfoValidation, updateUserInfo);

usersRouter.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = usersRouter;
