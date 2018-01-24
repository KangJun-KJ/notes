import User from '../models/user.js'

class UserControllers {

	async getUserId(ctx) {
		console.log(ctx.request.body.fields);
		await User.getUserId(ctx.request.body.fields)
			.then((result) => {
				if(result.openid){
					ctx.body = {
						success: true,
						userId: result.openid
					};
				}else{
					ctx.body = {
						success: false,
						detail: result.errmsg||"获取失败"
					};
				}
				
			},(result)=>{
				ctx.body={
					success:fasle,
					detail:result
				}
			})
			

	}

}

export default new UserControllers()