"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _models = require('../models');

 const createList = (req, res) => {
  _models.List.create(req.body)
    .then(response => {
      res.status(201).json({
        status: 'Success',
        list: response
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to create list!'
      })
    })
}; exports.createList = createList

 const getListsByBoard = async (req, res) => {
  try {
    const lists = await _models.List.find({ board: req.params.id }).sort('order').populate({
      path: 'cards',
      populate: {
        path: 'assignee'
      }
    })

    res.status(200).json({
      status: 'Success',
      lists
    })
  } catch (e) {
    res.status(400).json({
      status: 'Failure',
      message: 'Provided board doesn\'t have any lists!'
    })
  }
}; exports.getListsByBoard = getListsByBoard

 const updateList = async (req, res) => {
  try {
    const list = await _models.List.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate({
      path: 'cards',
      populate: {
        path: 'assignee'
      }
    })

    res.status(201).json({
      status: 'Success',
      list
    })
  } catch (e2) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to update list!'
    })
  }
}; exports.updateList = updateList

 const deleteList = async (req, res) => {
  try {
    await _models.List.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'Success',
      list: null
    })
  } catch (e3) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to delete list!'
    })
  }
}; exports.deleteList = deleteList
