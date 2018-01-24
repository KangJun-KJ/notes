var Koa=require("koa");
var app=new Koa();

const main=ctx=>{
	console.log(ctx);
	console.log('打开了')
	ctx.response.body=ctx;
}

app.use(main);

app.listen(8888,function(){
	console.log("httpServer running in 8888");
})
