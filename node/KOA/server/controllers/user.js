import User from '../models/user.js'

class UserControllers {
	
	async getUserId(ctx) {
		const result = await User.getUserId(ctx.request.body.fields)
		ctx.body =result;
	}

	
}

export default new UserControllers()