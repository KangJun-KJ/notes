'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _koaCors = require('koa-cors');

var _koaCors2 = _interopRequireDefault(_koaCors);

var _config = require('./config');

var _routes = require('./routes/');

var _routes2 = _interopRequireDefault(_routes);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-register');
// require("babel-core/register");
// require("babel-polyfill");

const serve = require('koa-static');
const path = require("path");
const main = serve(path.join(__dirname), 'static');

const app = new _koa2.default();
app.use((0, _koaCors2.default)()).use((0, _koaBody2.default)({
	multipart: true
}));

app.use(main);

(0, _routes2.default)(app);
app.on("error", (err, ctx) => {
	console.log("报错了");
	console.log(err);
	ctx.response.body = JSON.stringify({ "success": false, "detail": "请求失败" });
});
//app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))
var options = {
	key: _fs2.default.readFileSync('./ssl/214466102890795.key'),
	cert: _fs2.default.readFileSync('./ssl/214466102890795.pem')
};

console.log('port=' + _config.port);
_https2.default.createServer(options, app.callback()).listen(_config.port);

//require('child_process').exec( `babel-node index-wrapper.js` );
//pm2 delete all