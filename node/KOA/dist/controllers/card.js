"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _card = require("../models/card.js");

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CardControllers = function () {
	function CardControllers() {
		_classCallCheck(this, CardControllers);
	}

	_createClass(CardControllers, [{
		key: "getCardList",

		//获取当前所有的card列表
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
				var result;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return _card2.default.getAllCards(ctx.request.body);

							case 2:
								result = _context.sent;

								ctx.body = {
									success: true,
									data: result
								};

							case 4:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getCardList(_x) {
				return _ref.apply(this, arguments);
			}

			return getCardList;
		}()

		//获取一种模式的所有卡牌种类

	}, {
		key: "getAllCardsByCardMode",
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
				var result;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return _card2.default.getAllCardsByCardMode(ctx.request.body);

							case 2:
								result = _context2.sent;

								ctx.body = {
									success: true,
									data: result
								};

							case 4:
							case "end":
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getAllCardsByCardMode(_x2) {
				return _ref2.apply(this, arguments);
			}

			return getAllCardsByCardMode;
		}()

		//添加了一组新的卡牌

	}, {
		key: "setCarList",
		value: function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
				var card, result;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								card = ctx.request.body;
								_context3.next = 3;
								return _card2.default.addCard(card);

							case 3:
								result = _context3.sent;

								if (result.affectedRows === 1) {
									ctx.body = {
										success: true
									};
								} else {
									ctx.body = {
										success: false,
										detail: "插入失败"
									};
								}

							case 5:
							case "end":
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function setCarList(_x3) {
				return _ref3.apply(this, arguments);
			}

			return setCarList;
		}()

		//编辑卡牌根据id和userId

	}, {
		key: "editCard",
		value: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx) {
				var card, result;
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								card = ctx.request.body;
								_context4.next = 3;
								return _card2.default.updateCard(card);

							case 3:
								result = _context4.sent;

								if (result.affectedRows === 1) {
									ctx.body = {
										success: true
									};
								} else {
									ctx.body = {
										success: false,
										detail: "更新失败"
									};
								}

							case 5:
							case "end":
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function editCard(_x4) {
				return _ref4.apply(this, arguments);
			}

			return editCard;
		}()
		//点赞，如果在表中已经存在数据则表示已经点过赞了。

	}, {
		key: "likeCard",
		value: function () {
			var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx) {
				var card, result, total, _result, result2;

				return regeneratorRuntime.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								card = ctx.request.body;
								_context5.next = 3;
								return _card2.default.findLikeCard(card);

							case 3:
								result = _context5.sent;
								total = result[0]['count(*)'];

								console.log("输出用户的之前是否点过赞,total=" + total);

								if (!(total >= 1)) {
									_context5.next = 12;
									break;
								}

								_context5.next = 9;
								return _card2.default.cancelLike(card);

							case 9:
								_result = _context5.sent;

								if (_result[0].affectedRows == 1 && _result[1].affectedRows == 1) {
									ctx.body = {
										success: true,
										content: "取消点赞成功!"
									};
								} else {
									ctx.body = {
										success: false,
										content: "修改失败!"
									};
								}
								return _context5.abrupt("return");

							case 12:
								_context5.next = 14;
								return _card2.default.likeCard(card);

							case 14:
								result2 = _context5.sent;

								if (result2[0].affectedRows == 1 && result2[1].affectedRows == 1) {
									ctx.body = {
										success: true,
										content: '点赞成功了'
									};
								} else {
									ctx.body = {
										success: false,
										detail: "点赞失败"
									};
								}

							case 16:
							case "end":
								return _context5.stop();
						}
					}
				}, _callee5, this);
			}));

			function likeCard(_x5) {
				return _ref5.apply(this, arguments);
			}

			return likeCard;
		}()
	}, {
		key: "getCardMode",
		value: function () {
			var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ctx) {
				var result;
				return regeneratorRuntime.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								_context6.next = 2;
								return _card2.default.getAllCardModes();

							case 2:
								result = _context6.sent;

								ctx.body = {
									success: true,
									data: result
								};

							case 4:
							case "end":
								return _context6.stop();
						}
					}
				}, _callee6, this);
			}));

			function getCardMode(_x6) {
				return _ref6.apply(this, arguments);
			}

			return getCardMode;
		}()
	}]);

	return CardControllers;
}();

exports.default = new CardControllers();