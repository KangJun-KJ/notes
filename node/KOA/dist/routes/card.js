'use strict';

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _config = require('../config');

var _card = require('../controllers/card');

var _card2 = _interopRequireDefault(_card);

var _error = require('../middlewares/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = 'cards';

var router = new _koaRouter2.default();

router.prefix('/' + _config.baseApi + '/' + api);

router.post("/getCardModes", _card2.default.getCardMode);
router.post('/getCards', _card2.default.getCardList);
router.post('/getCardsByMode', _card2.default.getAllCardsByCardMode);
router.post("/addCard", _error2.default, _card2.default.setCarList);
router.post("/editCard", _error2.default, _card2.default.editCard);
router.post("/likeCard", _error2.default, _card2.default.likeCard);

module.exports = router;