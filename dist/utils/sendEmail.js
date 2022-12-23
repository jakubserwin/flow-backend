"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _config = require('../config'); var _config2 = _interopRequireDefault(_config);

 const sendEmail = async (message) => {
  const transporter = _nodemailer2.default.createTransport({
    service: 'hotmail',
    auth: {
      user: _config2.default.emailUserame,
      pass: _config2.default.emailPassword
    }
  })

  await transporter.sendMail(message)
}; exports.sendEmail = sendEmail
