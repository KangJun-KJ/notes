import Router from 'koa-router'

const router = new Router()

const main=ctx=>{
	ctx.response.body='欢迎来到kjbu2的api';
}


router.get('/', main)

module.exports = router
