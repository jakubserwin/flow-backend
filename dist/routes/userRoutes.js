"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _controllers = require('../controllers');
var _userController = require('../controllers/userController');

const userRouter = _express2.default.Router()

userRouter.post('/signup', _controllers.signUp)
userRouter.post('/login', _controllers.login)
userRouter.patch('/:id', _controllers.protect, _userController.uploadAvatar, _userController.resizeAvatar, _userController.updateUser)
userRouter.get('/:id', _controllers.protect, _userController.getMembers)

exports.userRouter = userRouter;
