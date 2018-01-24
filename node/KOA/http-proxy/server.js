const Koa = require('koa');
const fs = require('fs');
const https = require('https');

const app=new Koa();

const main=ctx=>{
	console.log(ctx);
	console.log('打开了')
	ctx.response.body=ctx;
}

app.use(main);

var options = {
	key: fs.readFileSync('../ssl/214466102890795.key'),
	cert: fs.readFileSync('../ssl/214466102890795.pem')
};

https.createServer(options, app.callback()).listen(443);