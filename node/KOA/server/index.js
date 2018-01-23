import Koa from 'koa'
import http from 'http'
import koaBody from 'koa-body'
import cors from 'koa-cors'
import {port} from './config'
import routing from './routes/'

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
app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))
