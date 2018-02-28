'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _query = require('../utils/query');

var _query2 = _interopRequireDefault(_query);

var _escape = require('../utils/escape');

var _escape2 = _interopRequireDefault(_escape);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class users {

	async getUserId({ code }) {
		return await new Promise((resolve, reject) => {
			console.log(code);
			//https://api.weixin.qq.com/sns/jscode2session?appid=wx985576fb7b47bade&secret=f59de630e2dff200e1ac6459a8caa739&js_code=013lyvd01LbWlZ1pGKd01m9Md01lyvda&grant_type=authorization_code
			_axios2.default.get("https://api.weixin.qq.com/sns/jscode2session", {
				params: {
					appid: "wx985576fb7b47bade",
					secret: "f59de630e2dff200e1ac6459a8caa739",
					js_code: code,
					grant_type: "authorization_code"
				}
			}).then(function (response) {
				console.log(response.data);
				console.log(typeof response.data);
				(0, _query2.default)(_escape2.default`insert into user (userId) VALUES (${userId.openid})ON DUPLICATE KEY UPDATE count=count+1; `);
				resolve(response.data);
			}).catch(function (err) {
				console.log(err);
				reject(err);
			});
		});
	}

	async sendSuggestion({ userId, text }) {
		return await (0, _query2.default)(_escape2.default`INSERT INTO usersuggest SET userId=${userId} , suggestion=${text}`);
	}

	async setComment({ cardId, userId, content }) {
		return await (0, _query2.default)(_escape2.default`INSERT INTO comment SET userId=${userId} , content=${content},cardId=${cardId};UPDATE card SET comments=comments+1 where id=${cardId};`);
	}

	async getComment({ cardId }) {
		return await (0, _query2.default)(_escape2.default`select a.content from comment a WHERE cardId=${cardId} ORDER BY createtime ASC`);
	}

	async getMyAnswer() {
		return await (0, _query2.default)(_escape2.default`select * from answer`);
	}

	//用力啊返回用户的数据	
	async getFunnyData() {}

	async setUserInfo({ userId, nickName, avatarUrl, gender }) {
		return await (0, _query2.default)(_escape2.default`insert into user (userId,nickName,avatarUrl,gender,count) VALUES (${userId},${nickName},${avatarUrl},${gender},0)ON DUPLICATE KEY UPDATE count=count+1,nickName=${nickName},avatarUrl=${avatarUrl},gender=${gender};`);
	}
}

exports.default = new users();