'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND a.userid = ', ' GROUP BY a.id,a.userid limit ', ',', ''], ['SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND a.userid = ', ' GROUP BY a.id,a.userid limit ', ',', '']),
    _templateObject2 = _taggedTemplateLiteral(['INSERT INTO card SET name=', ',userid=', ',createtime=', ',cardgroup=', ',introdution=', ',cardmode=', ',peoplelike=0'], ['INSERT INTO card SET name=', ',userid=', ',createtime=', ',cardgroup=', ',introdution=', ',cardmode=', ',peoplelike=0']),
    _templateObject3 = _taggedTemplateLiteral(['UPDATE card SET name=', ',createtime=', ',cardgroup=', ',introdution=', ',cardmode=', ' WHERE id=', ' and userid=', ''], ['UPDATE card SET name=', ',createtime=', ',cardgroup=', ',introdution=', ',cardmode=', ' WHERE id=', ' and userid=', '']),
    _templateObject4 = _taggedTemplateLiteral(['UPDATE card SET peoplelike=peoplelike+1 where id=', ';INSERT INTO userLikeCards SET cardId=', ',userId=', ''], ['UPDATE card SET peoplelike=peoplelike+1 where id=', ';INSERT INTO userLikeCards SET cardId=', ',userId=', '']),
    _templateObject5 = _taggedTemplateLiteral(['select count(*) from userLikeCards Where cardId=', ' AND userId=', ''], ['select count(*) from userLikeCards Where cardId=', ' AND userId=', '']),
    _templateObject6 = _taggedTemplateLiteral(['DELETE FROM userlikecards where cardId=', ' AND userId=', ';UPDATE card SET peoplelike=peoplelike-1 where id=', ';'], ['DELETE FROM userlikecards where cardId=', ' AND userId=', ';UPDATE card SET peoplelike=peoplelike-1 where id=', ';']),
    _templateObject7 = _taggedTemplateLiteral(['select * from mode'], ['select * from mode']);

var _query = require('../utils/query');

var _query2 = _interopRequireDefault(_query);

var _escape = require('../utils/escape');

var _escape2 = _interopRequireDefault(_escape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cards = function () {
	function Cards() {
		_classCallCheck(this, Cards);
	}

	_createClass(Cards, [{
		key: 'getAllCards',
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
				var userId = _ref.userId,
				    _ref$pageNow = _ref.pageNow,
				    pageNow = _ref$pageNow === undefined ? 1 : _ref$pageNow,
				    _ref$pageSize = _ref.pageSize,
				    pageSize = _ref$pageSize === undefined ? 5 : _ref$pageSize;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return (0, _query2.default)((0, _escape2.default)(_templateObject, userId, (pageNow - 1) * pageSize, pageSize));

							case 2:
								return _context.abrupt('return', _context.sent);

							case 3:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getAllCards(_x) {
				return _ref2.apply(this, arguments);
			}

			return getAllCards;
		}()
	}, {
		key: 'addCard',
		value: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
				var name = _ref3.name,
				    userid = _ref3.userid,
				    createtime = _ref3.createtime,
				    cardgroup = _ref3.cardgroup,
				    introdution = _ref3.introdution,
				    mode = _ref3.mode;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return (0, _query2.default)((0, _escape2.default)(_templateObject2, name, userid, createtime, cardgroup, introdution, mode));

							case 2:
								return _context2.abrupt('return', _context2.sent);

							case 3:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function addCard(_x2) {
				return _ref4.apply(this, arguments);
			}

			return addCard;
		}()
	}, {
		key: 'updateCard',
		value: function () {
			var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref5) {
				var id = _ref5.id,
				    name = _ref5.name,
				    userid = _ref5.userid,
				    createtime = _ref5.createtime,
				    cardgroup = _ref5.cardgroup,
				    introdution = _ref5.introdution,
				    mode = _ref5.mode;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return (0, _query2.default)((0, _escape2.default)(_templateObject3, name, createtime, cardgroup, introdution, mode, id, userid));

							case 2:
								return _context3.abrupt('return', _context3.sent);

							case 3:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function updateCard(_x3) {
				return _ref6.apply(this, arguments);
			}

			return updateCard;
		}()
	}, {
		key: 'likeCard',
		value: function () {
			var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref7) {
				var id = _ref7.id,
				    userId = _ref7.userId;
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return (0, _query2.default)((0, _escape2.default)(_templateObject4, id, id, userId));

							case 2:
								return _context4.abrupt('return', _context4.sent);

							case 3:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function likeCard(_x4) {
				return _ref8.apply(this, arguments);
			}

			return likeCard;
		}()
	}, {
		key: 'findLikeCard',
		value: function () {
			var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref9) {
				var id = _ref9.id,
				    userId = _ref9.userId;
				return regeneratorRuntime.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								_context5.next = 2;
								return (0, _query2.default)((0, _escape2.default)(_templateObject5, id, userId));

							case 2:
								return _context5.abrupt('return', _context5.sent);

							case 3:
							case 'end':
								return _context5.stop();
						}
					}
				}, _callee5, this);
			}));

			function findLikeCard(_x5) {
				return _ref10.apply(this, arguments);
			}

			return findLikeCard;
		}()
	}, {
		key: 'cancelLike',
		value: function () {
			var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref11) {
				var id = _ref11.id,
				    userId = _ref11.userId;
				return regeneratorRuntime.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								_context6.next = 2;
								return (0, _query2.default)((0, _escape2.default)(_templateObject6, id, userId, id));

							case 2:
								return _context6.abrupt('return', _context6.sent);

							case 3:
							case 'end':
								return _context6.stop();
						}
					}
				}, _callee6, this);
			}));

			function cancelLike(_x6) {
				return _ref12.apply(this, arguments);
			}

			return cancelLike;
		}()
	}, {
		key: 'getAllCardModes',
		value: function () {
			var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
				return regeneratorRuntime.wrap(function _callee7$(_context7) {
					while (1) {
						switch (_context7.prev = _context7.next) {
							case 0:
								_context7.next = 2;
								return (0, _query2.default)((0, _escape2.default)(_templateObject7));

							case 2:
								return _context7.abrupt('return', _context7.sent);

							case 3:
							case 'end':
								return _context7.stop();
						}
					}
				}, _callee7, this);
			}));

			function getAllCardModes() {
				return _ref13.apply(this, arguments);
			}

			return getAllCardModes;
		}()
	}]);

	return Cards;
}();

exports.default = new Cards();