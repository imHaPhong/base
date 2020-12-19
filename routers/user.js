const router = require('express').Router();
const userController = require('../controller/user')
const {verify} = require('../ultis/verifyToken')

router.use(verify)
router.post('/', userController.addPost)
router.get('/', userController.getAllPost)
router.get('/setting', userController.getUserSetting)
router.post('/:postID', userController.userComment)
router.post('/:postID/react', userController.userReatc)
module.exports = router