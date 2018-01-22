const koa=require("koa");

const app=new koa();

const main=ctx=>{
	if(ctx.request.path!="/"){
		ctx.response.type="html";
		ctx.response.body="<a href='/'>IndexPage</a>";
	}else{
		ctx.response.body="HellloWord";
	}
}

app.use(main);
app.listen(3000);
