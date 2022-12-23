"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');

var _cardModel = require('./cardModel');

const listSchema = new _mongoose.Schema({
  stage: {
    type: String,
    required: true,
    trim: true
  },
  cards: {
    type: [_mongoose.Schema.Types.ObjectId],
    ref: 'Card'
  },
  board: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  order: {
    type: Number
  }
})

listSchema.pre('findOneAndDelete', async function (next) {
  const { _id } = this.getQuery()
  const list = await exports.List.findById(_id)
  if (list === null) return
  list.cards.forEach(async (card) => {
    await _cardModel.Card.findByIdAndDelete(card)
  })
  next()
})

listSchema.pre('deleteMany', async function (next) {
  const { board } = this.getQuery()
  const lists = await exports.List.find({ board })
  lists.forEach((list) => {
    list.cards.forEach(async (card) => {
      await _cardModel.Card.findByIdAndDelete(card)
    })
  })
  next()
})

 const List = _mongoose.model('List', listSchema); exports.List = List
