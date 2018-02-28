'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _query = require('../utils/query');

var _query2 = _interopRequireDefault(_query);

var _escape = require('../utils/escape');

var _escape2 = _interopRequireDefault(_escape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Cards {

	async getAllCards({ userId, pageNow = 1, pageSize = 10 }) {
		return await (0, _query2.default)(_escape2.default`SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND a.userid = ${userId} GROUP BY a.id,a.userid limit ${(pageNow - 1) * pageSize},${pageSize}`);
	}

	async getAllcardsByLikes({ userId, pageNow = 1, pageSize = 10 }) {
		return await (0, _query2.default)(_escape2.default`SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND a.userid = ${userId} GROUP BY a.id,a.userid ORDER BY a.peoplelike DESC limit ${(pageNow - 1) * pageSize},${pageSize}`);
	}

	//获取用户自己的卡组。
	async getAllCardOfMySelf({ userId }) {
		return await (0, _query2.default)(_escape2.default`SELECT * FROM card WHERE userid=${userId}`);
	}

	async getAllCardsByCardMode({ userId, pageNow = 1, pageSize = 10, cardmode }) {
		if (cardmode == 0) {
			return await (0, _query2.default)(_escape2.default`SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND b.userid = ${userId} GROUP BY a.id,a.userid ORDER BY a.peoplelike DESC limit ${(pageNow - 1) * pageSize},${pageSize}`);
		} else if (cardmode == 1) {
			return await (0, _query2.default)(_escape2.default`SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND b.userid = ${userId} GROUP BY a.id,a.userid ORDER BY a.createtime DESC limit ${(pageNow - 1) * pageSize},${pageSize}`);
		}
		return await (0, _query2.default)(_escape2.default`SELECT a.*, count(b.cardId) count FROM card a LEFT JOIN userlikecards b ON a.id = b.cardId AND a.userid = ${userId} WHERE a.cardmode =${cardmode} GROUP BY a.id,a.userid ORDER BY a.createtime DESC limit ${(pageNow - 1) * pageSize},${pageSize}`);
	}
	async addCard({ name, userId, cardgroup, introduction, mode }) {
		return await (0, _query2.default)(_escape2.default`INSERT INTO card SET name=${name},userid=${userId},cardgroup=${cardgroup},introduction=${introduction},cardmode=${mode},peoplelike=0`);
	}
	async updateCard({ id, name, userid, createtime, cardgroup, introduction, mode }) {
		return await (0, _query2.default)(_escape2.default`UPDATE card SET name=${name},cardgroup=${cardgroup},introduction=${introduction},cardmode=${mode} WHERE id=${id} and userid=${userid}`);
	}

	async likeCard({ id, userId }) {
		return await (0, _query2.default)(_escape2.default`UPDATE card SET peoplelike=peoplelike+1 where id=${id};INSERT INTO userLikeCards SET cardId=${id},userId=${userId}`);
	}

	async findLikeCard({ id, userId }) {
		return await (0, _query2.default)(_escape2.default`select count(*) from userLikeCards Where cardId=${id} AND userId=${userId}`);
	}

	async cancelLike({ id, userId }) {
		return await (0, _query2.default)(_escape2.default`DELETE FROM userlikecards where cardId=${id} AND userId=${userId};UPDATE card SET peoplelike=peoplelike-1 where id=${id};`);
	}

	async getAllCardModes() {
		return await (0, _query2.default)(_escape2.default`select * from mode`);
	}
}

exports.default = new Cards();