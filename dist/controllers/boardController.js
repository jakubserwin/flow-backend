"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _models = require('../models');

 const createBoard = async (req, res) => {
  try {
    const board = await _models.Board.create(req.body)
    res.status(200).json({
      status: 'Success',
      board
    })
  } catch (e) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to create board!'
    })
  }
}; exports.createBoard = createBoard

 const getBoardsByProject = async (req, res) => {
  try {
    const boards = await _models.Board.find({ project: req.params.id })

    res.status(200).json({
      status: 'Success',
      boards
    })
  } catch (e2) {
    res.status(400).json({
      status: 'Failure',
      message: 'Project doesn\'t have any boards!'
    })
  }
}; exports.getBoardsByProject = getBoardsByProject

 const updateBoard = (req, res) => {
  _models.Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
    .then(response => {
      res.status(201).json({
        status: 'Success',
        board: response
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to update board!'
      })
    })
}; exports.updateBoard = updateBoard

 const deleteBoard = async (req, res) => {
  try {
    await _models.Board.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'Success',
      project: null
    })
  } catch (e3) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to delete board!'
    })
  }
}; exports.deleteBoard = deleteBoard

 const addOrRemoveMember = async (req, res) => {
  try {
    const board = await _models.Board.findById(req.params.id)
    if (board === null) return

    // Add member
    if (!board.members.includes(req.body.memberId)) {
      await _models.Board.findByIdAndUpdate(req.params.id, {
        members: [...board.members, req.body.memberId]
      }, {
        new: true
      })
    } else {
      // Remove member
      await _models.Board.findByIdAndUpdate(req.params.id, {
        members: board.members.filter((id) => req.body.memberId !== id.toString())
      }, {
        new: true
      })
    }
    const newBoard = await _models.Board.findById(req.params.id)
    res.status(200).json({
      status: 'Success',
      board: newBoard
    })
  } catch (e4) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to change member permissions!'
    })
  }
}; exports.addOrRemoveMember = addOrRemoveMember
