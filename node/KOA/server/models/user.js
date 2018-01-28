import query from '../utils/query'
import escape from '../utils/escape'
import http from 'http'
import axios from 'axios'
class users {

	async getUserId({code}) {
		return await new Promise((resolve, reject) => {
			console.log(code);
			//https://api.weixin.qq.com/sns/jscode2session?appid=wx985576fb7b47bade&secret=f59de630e2dff200e1ac6459a8caa739&js_code=013lyvd01LbWlZ1pGKd01m9Md01lyvda&grant_type=authorization_code
			axios.get("https://api.weixin.qq.com/sns/jscode2session", {
					params: {
						appid: "wx985576fb7b47bade",
						secret: "f59de630e2dff200e1ac6459a8caa739",
						js_code: code,
						grant_type: "authorization_code"
					}
				})
				.then(function(response) {
					console.log(response.data);
					console.log(typeof(response.data));
					resolve(response.data);
				})
				.catch(function(err){
					console.log(err);
					reject(err);
				})
			
		})
	}
	
	async sendSuggestion({userId,text}){
		console.log(escape`INSERT INTO usersuggest SET userId=${userId} , suggestion=${text}`);
		return await query(escape`INSERT INTO usersuggest SET userId=${userId} , suggestion=${text}`);
	}

}

export default new users()