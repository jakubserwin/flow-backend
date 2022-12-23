"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _utils = require('../utils');
var _models = require('../models');
var _pug = require('pug'); var _pug2 = _interopRequireDefault(_pug);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _url = require('url');

 const createProject = (req, res) => {
  _models.Project.create(req.body)
    .then(response => {
      res.status(201).json({
        status: 'Success',
        project: response
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to create project!'
      })
    })
}; exports.createProject = createProject

 const getProjectsByUser = async (req, res) => {
  try {
    const projects = await _models.Project.find({ owner: req.params.id }).populate('members')
    const guestProjects = await _models.Project.find({ members: req.params.id })

    res.status(200).json({
      status: 'Success',
      projects,
      guestProjects
    })
  } catch (e) {
    res.status(400).json({
      status: 'Failure',
      message: 'Provided user doesn\'t have any projects!'
    })
  }
}; exports.getProjectsByUser = getProjectsByUser

 const updateProject = (req, res) => {
  _models.Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
    .then(response => {
      res.status(201).json({
        status: 'Success',
        project: response
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to update project!'
      })
    })
}; exports.updateProject = updateProject

 const deleteProject = async (req, res) => {
  try {
    await _models.Project.findByIdAndDelete(req.params.id)
    await _models.Board.deleteMany({ project: req.params.id })

    res.status(204).json({
      status: 'Success',
      project: null
    })
  } catch (e2) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to delete project!'
    })
  }
}; exports.deleteProject = deleteProject

 const handleMember = async (req, res) => {
  try {
    const user = await _models.User.findOne({ email: req.body.email })
    const project = await _models.Project.findById(req.params.id)
    if (project === null || user === null) {
      res.status(400).json({
        status: 'Failure',
        message: 'User with provided email don\'t exists'
      })
      return
    }
    const owner = await _models.User.findById(project.owner)
    if (owner === null) return

    // Add member
    if (!project.members.includes(user._id)) {
      await _models.Project.findByIdAndUpdate(req.params.id, {
        members: [...project.members, user._id]
      }, {
        new: true
      })
      const _dirname = _path2.default.dirname(_url.fileURLToPath.call(void 0, import.meta.url))
      const html = _pug2.default.renderFile(`${_dirname}/../templates/email/invitation.pug`, {
        firstName: user.firstName,
        lastName: user.lastName,
        ownerFirstName: owner.firstName,
        ownerLastName: owner.lastName,
        project: project.name,
        timeStamp: new Date().toDateString()
      })
      await _utils.sendEmail.call(void 0, {
        from: 'flow-app@outlook.com',
        to: req.body.email,
        html,
        subject: 'Flow - You have been added to a project'
      })
    } else {
      // Remove member
      await _models.Project.findByIdAndUpdate(req.params.id, {
        members: project.members.filter((id) => !user._id.equals(id))
      }, {
        new: true
      })
    }
    const updatedProject = await _models.Project.findById(req.params.id).populate('members')
    res.status(200).json({
      status: 'Success',
      project: updatedProject
    })
  } catch (e3) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to add or remove member!'
    })
  }
}; exports.handleMember = handleMember
