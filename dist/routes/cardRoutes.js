"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);





var _controllers = require('../controllers');

const cardRouter = _express2.default.Router()

cardRouter
  .route('/')
  .post(_controllers.protect, _controllers.createCard)

cardRouter
  .route('/:id')
  .patch(_controllers.protect, _controllers.updateCard)
  .delete(_controllers.protect, _controllers.deleteCard)

exports.cardRouter = cardRouter;
