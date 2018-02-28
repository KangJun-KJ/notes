'use strict';

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter2.default();

const main = ctx => {
	let num = ctx.request.url.split('/');
	let str = num[num.length - 1];
	ctx.response.type = 'html';
	ctx.response.body = _fs2.default.createReadStream(`./server/template/${str}.html`);
};
const tetris = ctx => {
	ctx.response.type = 'html';
	ctx.response.body = _fs2.default.createReadStream(`./server/template/index.html`);
};

router.get('/demo/:id', main);
router.get('/tetris', tetris);

module.exports = router;