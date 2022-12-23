"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);


const userSchema = new _mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: String
})

userSchema.pre('save', async function (next) {
  this.password = await _bcryptjs2.default.hash(this.password, 12)
  next()
})

userSchema.methods.verifyPassword = async function (password) {
  return await _bcryptjs2.default.compare(password, this.password)
}

 const User = _mongoose.model('User', userSchema); exports.User = User
