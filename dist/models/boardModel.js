"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _mongoose = require('mongoose');

var _listModel = require('./listModel');
var _projectModel = require('./projectModel');

const boardSchema = new _mongoose.Schema({
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
  project: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  members: {
    type: [_mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true
  }
})

boardSchema.pre('save', async function (next) {
  // TODO improvement needed -> decrease double find
  const project = await _projectModel.Project.findById(this.project)
  await _projectModel.Project.findByIdAndUpdate(this.project, {
    boardsCount: _optionalChain([project, 'optionalAccess', _ => _.boardsCount])  + 1
  }, {
    new: true
  })
  next()
})

boardSchema.pre('findOneAndDelete', async function (next) {
  const { _id } = this.getQuery()
  const board = await exports.Board.findById(_id)
  await _listModel.List.deleteMany({ board: _id })
  const projectScheme = await _projectModel.Project.findById(_optionalChain([board, 'optionalAccess', _2 => _2.project]))
  if (projectScheme !== null && projectScheme.boardsCount > 0) {
    await _projectModel.Project.findByIdAndUpdate(_optionalChain([board, 'optionalAccess', _3 => _3.project]), {
      boardsCount: projectScheme.boardsCount - 1
    }, {
      new: true
    })
  }
  next()
})

boardSchema.pre('deleteMany', async function (next) {
  const { project } = this.getQuery()
  const boards = await exports.Board.find({ project })

  boards.forEach(async (board) => {
    await _listModel.List.deleteMany({ board: board._id })
  })

  next()
})

 const Board = _mongoose.model('Board', boardSchema); exports.Board = Board
