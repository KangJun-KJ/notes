//启动最简单的http服务

const koa=require('koa');
const app=new koa();

const main=ctx=>{
	console.log(ctx);
	console.log('打开了')
	ctx.response.body=ctx;
}

app.use(main);
app.listen(3001);
