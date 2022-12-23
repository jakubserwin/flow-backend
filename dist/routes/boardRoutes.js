"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _controllers = require('../controllers');

const boardRouter = _express2.default.Router()

boardRouter
  .route('/')
  .post(_controllers.protect, _controllers.createBoard)

boardRouter
  .route('/:id')
  .post(_controllers.protect, _controllers.addOrRemoveMember)
  .get(_controllers.protect, _controllers.getBoardsByProject)
  .patch(_controllers.protect, _controllers.updateBoard)
  .delete(_controllers.protect, _controllers.deleteBoard)

exports.boardRouter = boardRouter;
