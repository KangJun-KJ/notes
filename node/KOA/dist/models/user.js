'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['INSERT INTO usersuggest SET userId=', ' , suggestion=', ''], ['INSERT INTO usersuggest SET userId=', ' , suggestion=', '']);

var _query = require('../utils/query');

var _query2 = _interopRequireDefault(_query);

var _escape = require('../utils/escape');

var _escape2 = _interopRequireDefault(_escape);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var users = function () {
	function users() {
		_classCallCheck(this, users);
	}

	_createClass(users, [{
		key: 'getUserId',
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
				var code = _ref.code;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return new Promise(function (resolve, reject) {
									console.log(code);
									//https://api.weixin.qq.com/sns/jscode2session?appid=wx985576fb7b47bade&secret=f59de630e2dff200e1ac6459a8caa739&js_code=013lyvd01LbWlZ1pGKd01m9Md01lyvda&grant_type=authorization_code
									_axios2.default.get("https://api.weixin.qq.com/sns/jscode2session", {
										params: {
											appid: "wx985576fb7b47bade",
											secret: "f59de630e2dff200e1ac6459a8caa739",
											js_code: code,
											grant_type: "authorization_code"
										}
									}).then(function (response) {
										console.log(response.data);
										console.log(_typeof(response.data));
										resolve(response.data);
									}).catch(function (err) {
										console.log(err);
										reject(err);
									});
								});

							case 2:
								return _context.abrupt('return', _context.sent);

							case 3:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getUserId(_x) {
				return _ref2.apply(this, arguments);
			}

			return getUserId;
		}()
	}, {
		key: 'sendSuggestion',
		value: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
				var userId = _ref3.userId,
				    text = _ref3.text;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								console.log((0, _escape2.default)(_templateObject, userId, text));
								_context2.next = 3;
								return (0, _query2.default)((0, _escape2.default)(_templateObject, userId, text));

							case 3:
								return _context2.abrupt('return', _context2.sent);

							case 4:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function sendSuggestion(_x2) {
				return _ref4.apply(this, arguments);
			}

			return sendSuggestion;
		}()
	}]);

	return users;
}();

exports.default = new users();