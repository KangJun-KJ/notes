"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _card = require("../models/card.js");

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CardControllers {
	//获取当前所有的card列表
	async getCardList(ctx) {
		const result = await _card2.default.getAllCards(ctx.request.body);
		ctx.body = {
			success: true,
			data: result
		};
	}

	//获取一种模式的所有卡牌种类
	async getAllCardsByCardMode(ctx) {
		const result = await _card2.default.getAllCardsByCardMode(ctx.request.body);
		ctx.body = {
			success: true,
			data: result
		};
	}

	//获取个人卡组
	async getAllCardOfMySelf(ctx) {
		const result = await _card2.default.getAllCardOfMySelf(ctx.request.body);
		ctx.body = {
			success: true,
			data: result
		};
	}

	//添加了一组新的卡牌
	async setCarList(ctx) {
		const card = ctx.request.body;
		const result = await _card2.default.addCard(card);
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
	}

	//编辑卡牌根据id和userId
	async editCard(ctx) {
		const card = ctx.request.body;
		const result = await _card2.default.updateCard(card);
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
	}
	//点赞，如果在表中已经存在数据则表示已经点过赞了。
	async likeCard(ctx) {
		const card = ctx.request.body;
		const result = await _card2.default.findLikeCard(card);
		const total = result[0]['count(*)'];
		console.log("输出用户的之前是否点过赞,total=" + total);
		if (total >= 1) {
			const result2 = await _card2.default.cancelLike(card);
			if (result2[0].affectedRows == 1 && result2[1].affectedRows == 1) {
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
			return;
		}

		const result2 = await _card2.default.likeCard(card);
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
	}

	async getCardMode(ctx) {
		const result = await _card2.default.getAllCardModes();
		ctx.body = {
			success: true,
			data: result
		};
	}
}

exports.default = new CardControllers();