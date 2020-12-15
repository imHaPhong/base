const router = require('express').Router()
const adminController = require('../controller/admin')
const {verify, verifyAdmin} = require('../ultis/verifyToken')

router.use(verify,verifyAdmin)
router.post('/addAdmin', adminController.addAdminAccount)
router.get('/', adminController.test)

module.exports = router