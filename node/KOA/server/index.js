require('babel-register');
// require("babel-core/register");
// require("babel-polyfill");

import Koa from 'koa'
import https from 'https'
import koaBody from 'koa-body'
import cors from 'koa-cors'
import {port} from './config'
import routing from './routes/'
import fs from 'fs'
const serve = require('koa-static');
const path=require("path");
const main = serve(path.join(__dirname),'static');


const app=new Koa();
app.use(cors())
.use(koaBody({
	multipart: true
}));

app.use(main);

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

console.log('port='+port);
https.createServer(options, app.callback()).listen(port);

//require('child_process').exec( `babel-node index-wrapper.js` );
//pm2 delete all