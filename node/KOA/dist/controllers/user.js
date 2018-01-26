"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require("../models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserControllers = function () {
	function UserControllers() {
		_classCallCheck(this, UserControllers);
	}

	_createClass(UserControllers, [{
		key: "getUserId",
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								console.log(ctx.request.body);
								_context.next = 3;
								return _user2.default.getUserId(ctx.request.body).then(function (result) {
									if (result.openid) {
										ctx.body = {
											success: true,
											userId: result.openid
										};
									} else {
										ctx.body = {
											success: false,
											detail: result.errmsg || "获取失败"
										};
									}
								}, function (result) {
									ctx.body = {
										success: fasle,
										detail: result
									};
								});

							case 3:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getUserId(_x) {
				return _ref.apply(this, arguments);
			}

			return getUserId;
		}()
	}, {
		key: "sendSuggestion",
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
				var data, result;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								data = ctx.request.body;
								_context2.next = 3;
								return _user2.default.sendSuggestion(data);

							case 3:
								result = _context2.sent;

								if (result.affectedRows === 1) {
									ctx.body = {
										success: true
									};
								} else {
									ctx.body = {
										success: false,
										detail: "插入建议失败"
									};
								}

							case 5:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function sendSuggestion(_x2) {
				return _ref2.apply(this, arguments);
			}

			return sendSuggestion;
		}()
	}]);

	return UserControllers;
}();

exports.default = new UserControllers();