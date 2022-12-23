"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _sharp = require('sharp'); var _sharp2 = _interopRequireDefault(_sharp);
var _models = require('../models');

const multerStorage = _multer2.default.memoryStorage()

const multerFilter = (_, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new Error('Not an image! Please upload only images.'))
  }
}

const upload = _multer2.default.call(void 0, {
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 5000000
  }
})

 const uploadAvatar = upload.single('avatar'); exports.uploadAvatar = uploadAvatar

 const resizeAvatar = async (req, res, next) => {
  if (req.file === undefined) return next()

  req.file.filename = `user-${req.params.id}-${Date.now()}.jpeg`
  await _sharp2.default.call(void 0, req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`src/public/${req.file.filename}`)

  next()
}; exports.resizeAvatar = resizeAvatar

 const updateUser = (req, res) => {
  _models.User.findByIdAndUpdate(req.params.id, {
    avatar: _optionalChain([req, 'access', _2 => _2.file, 'optionalAccess', _3 => _3.filename])
  }, {
    new: true
  })
    .then(response => {
      res.status(200).json({
        status: 'Success',
        user: response
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to upload avatar'
      })
    })
}; exports.updateUser = updateUser

 const getMembers = async (req, res) => {
  try {
    const board = await _models.Board.findById(req.params.id).populate('members')
    if (board === null) return
    res.status(200).json({
      status: 'Success',
      members: board.members
    })
  } catch (e) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to get members!'
    })
  }
}; exports.getMembers = getMembers
