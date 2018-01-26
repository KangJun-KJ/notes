import Router from 'koa-router'
import { baseApi } from '../config'
import UserController from '../controllers/user'
import error from '../middlewares/error'

const api = 'users'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

router.post('/getUserId', UserController.getUserId)
router.post("/sendSuggestion",UserController.sendSuggestion);
module.exports = router