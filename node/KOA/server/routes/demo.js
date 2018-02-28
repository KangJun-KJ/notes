import Router from 'koa-router'
import fs from 'fs'

const router = new Router()

const main=ctx=>{
	let num=ctx.request.url.split('/');
	let str=num[num.length-1];
	ctx.response.type = 'html';
	ctx.response.body = fs.createReadStream(`./server/template/${str}.html`);
}
const tetris=ctx=>{
	ctx.response.type = 'html';
	ctx.response.body = fs.createReadStream(`./server/template/index.html`);
}


router.get('/demo/:id', main)
router.get('/tetris', tetris)

module.exports = router
