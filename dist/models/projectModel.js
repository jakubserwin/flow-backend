"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');


const projectSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  isFavourite: {
    type: Boolean,
    required: true
  },
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: {
    type: [_mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true
  },
  boardsCount: {
    type: Number,
    required: true
  }
})

 const Project = _mongoose.model('Project', projectSchema); exports.Project = Project
