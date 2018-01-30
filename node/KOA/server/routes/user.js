import Router from 'koa-router'
import { baseApi } from '../config'
import UserController from '../controllers/user'
import error from '../middlewares/error'

const api = 'users'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

router.post('/getUserId', UserController.getUserId);									//获取用户的userId
router.post("/sendSuggestion",UserController.sendSuggestion);							//发送用户建议
router.post("/setComment",UserController.setComment);									//添加用户的评论
router.post("/getComment",UserController.getComment);									//获取用户的评论
router.post("/getAnswer",UserController.getMyAnswer);									//获取我的回答
router.post("/setUserInfo",UserController.setUserInfo); 								//发送用户信息
module.exports = router