"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _user = require("../models/user.js");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserControllers {

	async getUserId(ctx) {
		console.log(ctx.request.body);
		await _user2.default.getUserId(ctx.request.body).then(result => {
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
		}, result => {
			ctx.body = {
				success: false,
				detail: result
			};
		});
	}

	//用户的反馈意见
	async sendSuggestion(ctx) {
		const data = ctx.request.body;
		const result = await _user2.default.sendSuggestion(data);
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
	}

	//获取我的回答
	async getMyAnswer(ctx) {
		const result = await _user2.default.getMyAnswer();
		ctx.body = {
			success: true,
			data: result
		};
	}

	//获取大数据详情
	async getFunnyData(ct) {
		const result = await _user2.default.getFunnyData();
		ctx.body = "该接口还没有实现";
	}
	//添加评论
	async setComment(ctx) {
		const data = ctx.request.body;
		const result = await _user2.default.setComment(data);
		console.log(result);
		if (result[0].affectedRows === 1) {
			ctx.body = {
				success: true
			};
		} else {
			ctx.body = {
				success: false,
				detail: "插入评论失败"
			};
		}
	}

	//获取评论
	async getComment(ctx) {
		const data = ctx.request.body;
		const result = await _user2.default.getComment(data);

		ctx.body = {
			success: true,
			data: result
		};
	}

	//获取用户的信息并且上传
	async setUserInfo(ctx) {
		const data = ctx.request.body;
		const result = await _user2.default.setUserInfo(data);
		if (result.affectedRows === 2) {
			ctx.body = {
				success: true,
				detail: "信息上传成功"
			};
		} else {
			ctx.body = {
				success: false,
				detail: "信息上传失败"
			};
		}
	}
}

exports.default = new UserControllers();