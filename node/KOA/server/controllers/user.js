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

	async sendSuggestion(ctx){
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
}

export default new UserControllers()