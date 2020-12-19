const User = require('../models/user')
const Admin = require('../models/admin')
const Shop = require('../models/shop')
const jwt = require('jsonwebtoken')

exports.getLogin = (req, res) => {
    res.render('login', {err: false})
}

exports.login = async (req, res) => {
    let user = ""
    try {
        if(await User.findOne({'email': req.body.email})){
            user = await User.findOne({'email': req.body.email})
        } else if(await Admin.findOne({'email': req.body.email})) {
            user = await Admin.findOne({'email': req.body.email})
        } else if(await Shop.findOne({'email': req.body.email})) {
            user = await Shop.findOne({'email': req.body.email})
        }
        if(!user) return res.render("login", {err: true})
        if(user.password != req.body.password) res.render("login", {err: true})
        const token = jwt.sign({_id: user._id, role: user.role}, process.env.TOKEN_SECRET)
        res.header('auth-token', token).render(token)
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