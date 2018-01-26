'use strict';

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _config = require('../config');

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _error = require('../middlewares/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = 'users';

var router = new _koaRouter2.default();

router.prefix('/' + _config.baseApi + '/' + api);

router.post('/getUserId', _user2.default.getUserId);
router.post("/sendSuggestion", _user2.default.sendSuggestion);
module.exports = router;