"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');


const cardSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  assignee: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dueDate: {
    type: Number
  },
  order: {
    type: Number
  },
  description: {
    type: String
  }
})

 const Card = _mongoose.model('Card', cardSchema); exports.Card = Card
