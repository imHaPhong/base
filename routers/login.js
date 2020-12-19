const router = require('express').Router()
const passport = require('passport');

const loginController = require('../controller/login')

require('../ultis/oauth');
router.get('/', loginController.getLogin)
router.get('/gg', loginController.loginWithGG)
// router.get('/gg/cb', loginController.googleCb)
router.get('/gg/cb', passport.authenticate('google', { failureRedirect: '/login' }), loginController.googleCb)
router.post('/', loginController.login)
router.post('/register', loginController.register)

module.exports = router