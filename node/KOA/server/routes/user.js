import Router from 'koa-router'
import { baseApi } from '../config'
import UserController from '../controllers/user'
import error from '../middlewares/error'

const api = 'users'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

router.post('/getUserId', UserController.getUserId)
router.post("/sendSuggestion",UserController.sendSuggestion);
router.post("/setComment",UserController.setComment);
router.post("/getComment",UserController.getComment);
router.post("/getAnswer",UserController.getMyAnswer);

module.exports = router