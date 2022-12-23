"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _models = require('../models');

 const createCard = async (req, res) => {
  try {
    const { name, assignee, list, order } = req.body
    const card = await _models.Card.create({
      name,
      assignee,
      order
    })

    await _models.List.updateOne(
      { _id: list },
      { $push: { cards: card } }
    )

    res.status(201).json({
      status: 'Success',
      card
    })
  } catch (err) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to create card!'
    })
  }
}; exports.createCard = createCard

 const updateCard = async (req, res) => {
  try {
    const card = await _models.Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(201).json({
      status: 'Success',
      card
    })
  } catch (e) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to update card!'
    })
  }
}; exports.updateCard = updateCard

 const deleteCard = async (req, res) => {
  try {
    await _models.Card.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'Success',
      card: null
    })
  } catch (e2) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to delete card!'
    })
  }
}; exports.deleteCard = deleteCard
