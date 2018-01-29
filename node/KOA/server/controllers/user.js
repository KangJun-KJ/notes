import User from '../models/user.js'

class UserControllers {

	async getUserId(ctx) {
		console.log(ctx.request.body);
		await User.getUserId(ctx.request.body)
			.then((result) => {
				if(result.openid) {
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
			}, (result) => {
				ctx.body = {
					success: fasle,
					detail: result
				}
			})
	}

	//用户的反馈意见
	async sendSuggestion(ctx) {
		const data = ctx.request.body;
		const result = await User.sendSuggestion(data);
		if(result.affectedRows === 1) {
			ctx.body = {
				success: true
			}
		} else {
			ctx.body = {
				success: false,
				detail: "插入建议失败"
			}
		}
	}

	
	
	//获取我的回答
	async getMyAnswer(ctx){
		const result = await User.getMyAnswer();
		ctx.body = {
			success: true,
			data: result
		}
	}
	
	//获取大数据详情

	//添加评论
	async setComment(ctx) {
		const data = ctx.request.body;
		const result = await User.setComment(data);
		console.log(result);
		if(result[0].affectedRows === 1) {
			ctx.body = {
				success: true
			}
		} else {
			ctx.body = {
				success: false,
				detail: "插入评论失败"
			}
		}
	}

	//获取评论
	async getComment(ctx) {
		const data = ctx.request.body;
		const result = await User.getComment(data);
		
		ctx.body = {
			success: true,
			data: result
		}
	}
}

export default new UserControllers()