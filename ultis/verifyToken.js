const jwt = require('jsonwebtoken')
const Shop = require('../models/shop')

module.exports.verify = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.send('Access Denied')

    try {
        const isVerify = jwt.verify(token, process.env.TOKEN_SECRET)
        if (!isVerify) return res.send('Invalid token')
        req.token = isVerify
        next()
    } catch (error) {
        res.send(error)
    }
}
module.exports.verifyAdmin = (req, res, next) => {
   if(req.token.role != "admin") return res.send("can not access")
   next()
}
module.exports.verifyShop = async (req, res, next) => {
    if(req.token.role != "shop") return res.send("can not access")
    const shop = await Shop.findById(req.token._id)
    if(shop.statuses == "not active") return res.send("ur shop dang duojc phe duyt")
    next()
 }