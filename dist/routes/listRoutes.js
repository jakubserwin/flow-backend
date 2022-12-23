"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _controllers = require('../controllers');

const listRouter = _express2.default.Router()

listRouter
  .route('/')
  .post(_controllers.protect, _controllers.createList)

listRouter
  .route('/:id')
  .get(_controllers.protect, _controllers.getListsByBoard)
  .patch(_controllers.protect, _controllers.updateList)
  .delete(_controllers.protect, _controllers.deleteList)

exports.listRouter = listRouter;
