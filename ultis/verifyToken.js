const jwt = require('jsonwebtoken')

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