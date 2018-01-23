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

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'mydb'
});

var sql = "select * FROM myguests ";
pool.query(sql, function(err, rows) {
	if(err) throw err;
//	console.log(rows);
})
//pool.getConnection(function(err, connection) {
//	if(err) throw err;
//	connection.query(sql, function(err, rows) {
//		if(err) throw err;
//		console.log(rows);
//		//回收pool
//		connection.release();
//	});
//});