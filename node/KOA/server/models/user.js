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
					query(escape`insert into user (userId) VALUES (${userId.openid})ON DUPLICATE KEY UPDATE count=count+1; `);
					resolve(response.data);
				})
				.catch(function(err){
					console.log(err);
					reject(err);
				})
			
		})
	}
	
	async sendSuggestion({userId,text}){
		return await query(escape`INSERT INTO usersuggest SET userId=${userId} , suggestion=${text}`);
	}
	
	async setComment({cardId,userId,content}){
		return await query(escape`INSERT INTO comment SET userId=${userId} , content=${content},cardId=${cardId};UPDATE card SET comments=comments+1 where id=${cardId};`);
	}
	
	async getComment({cardId}){
		return await query(escape`select a.content from comment a WHERE cardId=${cardId} ORDER BY createtime ASC`);
	}
	
	async getMyAnswer(){
		return await query(escape`select * from answer`);
	}
	
	async setUserInfo({userId,nickName,avatarUrl,gender}){
		return await query(escape`insert into user (userId,nickName,avatarUrl,gender,count) VALUES (${userId},${nickName},${avatarUrl},${gender},0)ON DUPLICATE KEY UPDATE count=count+1,nickName=${nickName},avatarUrl=${avatarUrl},gender=${gender};`);
	}
}

export default new users()