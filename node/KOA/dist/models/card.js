'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND a.userid = ', ' GROUP BY a.id,a.userid limit ', ',', ''], ['SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND a.userid = ', ' GROUP BY a.id,a.userid limit ', ',', '']),
    _templateObject2 = _taggedTemplateLiteral(['SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND a.userid = ', ' GROUP BY a.id,a.userid ORDER BY a.peoplelike DESC limit ', ',', ''], ['SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND a.userid = ', ' GROUP BY a.id,a.userid ORDER BY a.peoplelike DESC limit ', ',', '']),
    _templateObject3 = _taggedTemplateLiteral(['SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND a.userid = ', ' WHERE a.cardmode =', ' GROUP BY a.id,a.userid limit ', ',', ''], ['SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND a.userid = ', ' WHERE a.cardmode =', ' GROUP BY a.id,a.userid limit ', ',', '']),
    _templateObject4 = _taggedTemplateLiteral(['INSERT INTO card SET name=', ',userid=', ',cardgroup=', ',introduction=', ',cardmode=', ',peoplelike=0'], ['INSERT INTO card SET name=', ',userid=', ',cardgroup=', ',introduction=', ',cardmode=', ',peoplelike=0']),
    _templateObject5 = _taggedTemplateLiteral(['UPDATE card SET name=', ',cardgroup=', ',introduction=', ',cardmode=', ' WHERE id=', ' and userid=', ''], ['UPDATE card SET name=', ',cardgroup=', ',introduction=', ',cardmode=', ' WHERE id=', ' and userid=', '']),
    _templateObject6 = _taggedTemplateLiteral(['UPDATE card SET peoplelike=peoplelike+1 where id=', ';INSERT INTO userLikeCards SET cardId=', ',userId=', ''], ['UPDATE card SET peoplelike=peoplelike+1 where id=', ';INSERT INTO userLikeCards SET cardId=', ',userId=', '']),
    _templateObject7 = _taggedTemplateLiteral(['select count(*) from userLikeCards Where cardId=', ' AND userId=', ''], ['select count(*) from userLikeCards Where cardId=', ' AND userId=', '']),
    _templateObject8 = _taggedTemplateLiteral(['DELETE FROM userlikecards where cardId=', ' AND userId=', ';UPDATE card SET peoplelike=peoplelike-1 where id=', ';'], ['DELETE FROM userlikecards where cardId=', ' AND userId=', ';UPDATE card SET peoplelike=peoplelike-1 where id=', ';']),
    _templateObject9 = _taggedTemplateLiteral(['select * from mode'], ['select * from mode']);

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
				    pageSize = _ref$pageSize === undefined ? 10 : _ref$pageSize;
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
		key: 'getAllcardsByLikes',
		value: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
				var userId = _ref3.userId,
				    _ref3$pageNow = _ref3.pageNow,
				    pageNow = _ref3$pageNow === undefined ? 1 : _ref3$pageNow,
				    _ref3$pageSize = _ref3.pageSize,
				    pageSize = _ref3$pageSize === undefined ? 10 : _ref3$pageSize;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return (0, _query2.default)((0, _escape2.default)(_templateObject2, userId, (pageNow - 1) * pageSize, pageSize));

							case 2:
								return _context2.abrupt('return', _context2.sent);

							case 3:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getAllcardsByLikes(_x2) {
				return _ref4.apply(this, arguments);
			}

			return getAllcardsByLikes;
		}()
	}, {
		key: 'getAllCardsByCardMode',
		value: function () {
			var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref5) {
				var userId = _ref5.userId,
				    _ref5$pageNow = _ref5.pageNow,
				    pageNow = _ref5$pageNow === undefined ? 1 : _ref5$pageNow,
				    _ref5$pageSize = _ref5.pageSize,
				    pageSize = _ref5$pageSize === undefined ? 10 : _ref5$pageSize,
				    cardmode = _ref5.cardmode;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								if (!(cardmode == 0)) {
									_context3.next = 6;
									break;
								}

								_context3.next = 3;
								return (0, _query2.default)((0, _escape2.default)(_templateObject2, userId, (pageNow - 1) * pageSize, pageSize));

							case 3:
								return _context3.abrupt('return', _context3.sent);

							case 6:
								if (!(cardmode == 1)) {
									_context3.next = 10;
									break;
								}

								_context3.next = 9;
								return (0, _query2.default)((0, _escape2.default)(_templateObject, userId, (pageNow - 1) * pageSize, pageSize));

							case 9:
								return _context3.abrupt('return', _context3.sent);

							case 10:
								_context3.next = 12;
								return (0, _query2.default)((0, _escape2.default)(_templateObject3, userId, cardmode, (pageNow - 1) * pageSize, pageSize));

							case 12:
								return _context3.abrupt('return', _context3.sent);

							case 13:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function getAllCardsByCardMode(_x3) {
				return _ref6.apply(this, arguments);
			}

			return getAllCardsByCardMode;
		}()
	}, {
		key: 'addCard',
		value: function () {
			var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref7) {
				var name = _ref7.name,
				    userId = _ref7.userId,
				    cardgroup = _ref7.cardgroup,
				    introduction = _ref7.introduction,
				    mode = _ref7.mode;
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return (0, _query2.default)((0, _escape2.default)(_templateObject4, name, userId, cardgroup, introduction, mode));

							case 2:
								return _context4.abrupt('return', _context4.sent);

							case 3:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function addCard(_x4) {
				return _ref8.apply(this, arguments);
			}

			return addCard;
		}()
	}, {
		key: 'updateCard',
		value: function () {
			var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref9) {
				var id = _ref9.id,
				    name = _ref9.name,
				    userid = _ref9.userid,
				    createtime = _ref9.createtime,
				    cardgroup = _ref9.cardgroup,
				    introduction = _ref9.introduction,
				    mode = _ref9.mode;
				return regeneratorRuntime.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								_context5.next = 2;
								return (0, _query2.default)((0, _escape2.default)(_templateObject5, name, cardgroup, introduction, mode, id, userid));

							case 2:
								return _context5.abrupt('return', _context5.sent);

							case 3:
							case 'end':
								return _context5.stop();
						}
					}
				}, _callee5, this);
			}));

			function updateCard(_x5) {
				return _ref10.apply(this, arguments);
			}

			return updateCard;
		}()
	}, {
		key: 'likeCard',
		value: function () {
			var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref11) {
				var id = _ref11.id,
				    userId = _ref11.userId;
				return regeneratorRuntime.wrap(function _callee6$(_context6) {
					while (1) {
						switch (_context6.prev = _context6.next) {
							case 0:
								_context6.next = 2;
								return (0, _query2.default)((0, _escape2.default)(_templateObject6, id, id, userId));

							case 2:
								return _context6.abrupt('return', _context6.sent);

							case 3:
							case 'end':
								return _context6.stop();
						}
					}
				}, _callee6, this);
			}));

			function likeCard(_x6) {
				return _ref12.apply(this, arguments);
			}

			return likeCard;
		}()
	}, {
		key: 'findLikeCard',
		value: function () {
			var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_ref13) {
				var id = _ref13.id,
				    userId = _ref13.userId;
				return regeneratorRuntime.wrap(function _callee7$(_context7) {
					while (1) {
						switch (_context7.prev = _context7.next) {
							case 0:
								_context7.next = 2;
								return (0, _query2.default)((0, _escape2.default)(_templateObject7, id, userId));

							case 2:
								return _context7.abrupt('return', _context7.sent);

							case 3:
							case 'end':
								return _context7.stop();
						}
					}
				}, _callee7, this);
			}));

			function findLikeCard(_x7) {
				return _ref14.apply(this, arguments);
			}

			return findLikeCard;
		}()
	}, {
		key: 'cancelLike',
		value: function () {
			var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_ref15) {
				var id = _ref15.id,
				    userId = _ref15.userId;
				return regeneratorRuntime.wrap(function _callee8$(_context8) {
					while (1) {
						switch (_context8.prev = _context8.next) {
							case 0:
								_context8.next = 2;
								return (0, _query2.default)((0, _escape2.default)(_templateObject8, id, userId, id));

							case 2:
								return _context8.abrupt('return', _context8.sent);

							case 3:
							case 'end':
								return _context8.stop();
						}
					}
				}, _callee8, this);
			}));

			function cancelLike(_x8) {
				return _ref16.apply(this, arguments);
			}

			return cancelLike;
		}()
	}, {
		key: 'getAllCardModes',
		value: function () {
			var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
				return regeneratorRuntime.wrap(function _callee9$(_context9) {
					while (1) {
						switch (_context9.prev = _context9.next) {
							case 0:
								_context9.next = 2;
								return (0, _query2.default)((0, _escape2.default)(_templateObject9));

							case 2:
								return _context9.abrupt('return', _context9.sent);

							case 3:
							case 'end':
								return _context9.stop();
						}
					}
				}, _callee9, this);
			}));

			function getAllCardModes() {
				return _ref17.apply(this, arguments);
			}

			return getAllCardModes;
		}()
	}]);

	return Cards;
}();

exports.default = new Cards();