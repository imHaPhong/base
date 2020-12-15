const User = require('../models/user')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    let user = ""
    try {
        if(await User.findOne({'email': req.body.email})){
            user = await User.findOne({'email': req.body.email})
        } else if(await Admin.findOne({'email': req.body.email})) {
            user = await Admin.findOne({'email': req.body.email})
        }
        if(!user) return res.send("Email hoac mat khau k dung")
        if(user.password != req.body.password) return res.send("Email hoac mat khau k dung")
        const token = jwt.sign({_id: user._id, role: user.role}, process.env.TOKEN_SECRET)
        res.header('auth-token', token).send(token)
    } catch (err) {  
        console.log(err);
    }
}

exports.register = async (req, res) => {
    try {
        const newUser = await User(req.body).save()
        res.send(newUser)
    } catch (error) {
        console.log(error);
    }
}