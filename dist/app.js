"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _expressratelimit = require('express-rate-limit'); var _expressratelimit2 = _interopRequireDefault(_expressratelimit);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _config = require('./config'); var _config2 = _interopRequireDefault(_config);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _url = require('url');
var _routes = require('./routes');

// Create Express App
const app = _express2.default.call(void 0, )

// Global Middleware
app.use(_helmet2.default.call(void 0, {
  crossOriginResourcePolicy: false
}))
app.use(_expressratelimit2.default.call(void 0, {
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Too many requests from this IP!'
}))
app.use(_express2.default.json())
app.use(_cors2.default.call(void 0, ))

const _dirname = _path2.default.dirname(_url.fileURLToPath.call(void 0, import.meta.url))
app.use('/public', _express2.default.static(_dirname + '/public'))

// Routes
app.use('/users', _routes.userRouter)
app.use('/projects', _routes.projectRouter)
app.use('/boards', _routes.boardRouter)
app.use('/lists', _routes.listRouter)
app.use('/cards', _routes.cardRouter)

// DB Connection
_mongoose2.default.connect(_config2.default.databaseUrl, error => {
  if (error != null) {
    console.log(error)
  } else {
    console.info('Connection with database established!')
  }
})

app.listen(_config2.default.port, () => {
  console.log(`Example app listening on port ${_config2.default.port}!`)
})
