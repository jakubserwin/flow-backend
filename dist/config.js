"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }var _dotenv = require('dotenv'); var dotenv = _interopRequireWildcard(_dotenv);

// Read config
dotenv.config()

const config = {
  port: _nullishCoalesce(process.env.PORT, () => ( 8000)),
  databaseUrl: _nullishCoalesce(process.env.DATABASE_URL, () => ( '')),
  jwtSecret: _nullishCoalesce(process.env.JWT_SECRET, () => ( '')),
  emailUserame: _nullishCoalesce(process.env.EMAIL_USERNAME, () => ( '')),
  emailPassword: _nullishCoalesce(process.env.EMAIL_PASSWORD, () => ( ''))
}

exports. default = config
