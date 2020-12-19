const router = require('express').Router()
const loginController = require('../controller/login')

router.get('/', loginController.getLogin)
router.post('/', loginController.login)
router.post('/register', loginController.register)

module.exports = router