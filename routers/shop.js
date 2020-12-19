const router = require('express').Router()
const shopController = require('../controller/shop')
const {verify,verifyShop} = require('../ultis/verifyToken')

router.post('/newShop', shopController.createShop)
router.use(verify)
router.post('/addMenu', verifyShop, shopController.shopAddMenu)

module.exports = router