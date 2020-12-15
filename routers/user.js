const router = require('express').Router();
const userController = require('../controller/user')
const {verify} = require('../ultis/verifyToken')

router.use(verify)
router.post('/', userController.addPost)
router.get('/', userController.getAllPost)
module.exports = router