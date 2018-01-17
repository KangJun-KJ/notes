//输出url中q参数的md5值

// 引入依赖
var express = require('express');
var utility = require('utility');

var app=express();

app.get('/',function(req,res){
	
	var q=req.query.q;
	console.log(q);
	var md5Value=utility.md5(q);
	
	res.send(md5Value);
})

var server = app.listen(8081, function () {
 
var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})