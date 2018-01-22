const mysql = require("mysql");
const koa = require('koa');
const route = require('koa-route');
const cors = require('koa-cors');
const fs = require('fs');
const koaBody = require('koa-body');

const app = new koa();
const port = 3000;
//解决跨域
app.use(cors());
//获取body
app.use(koaBody({
	multipart: true
}));

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'mydb'
});

const main = function(ctx, next) {
	connection.connect();
	return new Promise((resolve, reject) => {
		connection.query('select * FROM myguests', function(error, results, fields) {
			if(error) {
				reject(error);
			} else {
				
				ctx.response.body = results;
				resolve(next());
			}
//			connection.release();
		});
	});
}

const updateUser = function(ctx, next) {
	console.log(ctx.request.body);
	const name = ctx.request.body.name;
	return new Promise((resolve, reject) => {
		connection
	})
	ctx.response.body = 123;
}

//定义api接口
app.use(route.get('/api/getUser', main));
app.use(route.post('/api/updateUser', updateUser));

app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))