'use strict';

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _config = require('../config');

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _error = require('../middlewares/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const api = 'users';

const router = new _koaRouter2.default();

router.prefix(`/${_config.baseApi}/${api}`);

router.post('/getUserId', _user2.default.getUserId); //获取用户的userId
router.post("/sendSuggestion", _user2.default.sendSuggestion); //发送用户建议
router.post("/setComment", _user2.default.setComment); //添加用户的评论
router.post("/getComment", _user2.default.getComment); //获取用户的评论
router.post("/getAnswer", _user2.default.getMyAnswer); //获取我的回答
router.post("/setUserInfo", _user2.default.setUserInfo); //发送用户信息
router.post("/getFunnyData", _user2.default.getFunnyData); //获取小程序用户使用的数据

module.exports = router;