'use strict';

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter2.default();

const main = ctx => {
	ctx.response.body = '欢迎来到kjbu2的api';
};

router.get('/', main);

module.exports = router;