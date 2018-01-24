import query from '../utils/query'
import escape from '../utils/escape'
import http from 'http'
class users {
	
    async getUserId({code}) {
      	return await new Promise((resolve, reject) => {
//			https://api.weixin.qq.com/sns/jscode2session?appid=wx985576fb7b47bade&secret=f59de630e2dff200e1ac6459a8caa739&js_code=013lyvd01LbWlZ1pGKd01m9Md01lyvda&grant_type=authorization_code
			resolve(code);
		})
    }
	
}

export default new users()