import Router from 'koa-router'
import {baseApi} from '../config'
import CardController from '../controllers/card'
import error from '../middlewares/error'

const api = 'cards'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

router.post('/getCards', CardController.getCardList)
router.post("/addCard",error,CardController.setCarList);
router.post("/editCard",error,CardController.editCard);
router.post("/likeCard",error,CardController.likeCard);

module.exports = router
