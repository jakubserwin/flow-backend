"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);


var _config = require('../config'); var _config2 = _interopRequireDefault(_config);
var _models = require('../models');


const signToken = (id) => {
  return _jsonwebtoken2.default.sign({ id }, process.env.JWT_SECRET , {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

 const signUp = (req, res) => {
  _models.User.create(req.body)
    .then(response => {
      const token = signToken(response._id)

      res.status(201).json({
        status: 'Success',
        token,
        user: response
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Invalid signUp data'
      })
    })
}; exports.signUp = signUp

 const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (email === '' || password === '') {
      res.status(400).json({
        status: 'Failure',
        message: 'Empty values provided'
      })
      return
    }

    const user = await _models.User.findOne({ email }).select('+password')

    if ((user == null) || !(await user.verifyPassword(password))) {
      res.status(400).json({
        status: 'Failure',
        message: 'Invalid email or password'
      })
      return
    }

    const token = signToken(user._id)
    res.status(201).json({
      status: 'Success',
      token,
      user
    })
  } catch (e) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong'
    })
  }
}; exports.login = login

 const protect = async (req, res, next) => {
  try {
    let token = ''

    const { authorization } = req.headers

    if (authorization !== undefined && authorization !== null) {
      token = authorization.startsWith('Bearer') ? authorization.split(' ')[1] : ''
    }

    if (token === '') {
      res.status(401).json({
        status: 'Failure',
        message: 'You are not logged in!'
      })
      return
    }

    // 2) Verification token
    const decoded = _jsonwebtoken2.default.verify(token, _config2.default.jwtSecret) 

    // 3) Check if user still exists
    const isUser = await _models.User.findById(decoded.id)
    if (isUser == null) {
      res.status(401).json({
        status: 'Failure',
        message: 'User no longer exists!'
      })
      return
    }

    next()
  } catch (err) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong!'
    })
  }
}; exports.protect = protect
