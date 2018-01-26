import Koa from 'koa'
import https from 'https'
import koaBody from 'koa-body'
import cors from 'koa-cors'
import {port} from './config'
import routing from './routes/'
import fs from 'fs'


const app=new Koa();
app.use(cors())
.use(koaBody({
	multipart: true
}));


routing(app)
app.on("error",(err,ctx)=>{
	console.log("报错了");
	console.log(err);
	ctx.response.body=JSON.stringify({"success":false,"detail":"请求失败"});
})
//app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))
var options = {
	key: fs.readFileSync('./ssl/214466102890795.key'),
	cert: fs.readFileSync('./ssl/214466102890795.pem')
};

https.createServer(options, app.callback()).listen(port);

