"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);







var _controllers = require('../controllers');

const projectRouter = _express2.default.Router()

projectRouter
  .route('/')
  .post(_controllers.protect, _controllers.createProject)

projectRouter
  .route('/:id')
  .post(_controllers.protect, _controllers.handleMember)
  .get(_controllers.protect, _controllers.getProjectsByUser)
  .patch(_controllers.protect, _controllers.updateProject)
  .delete(_controllers.protect, _controllers.deleteProject)

exports.projectRouter = projectRouter;
