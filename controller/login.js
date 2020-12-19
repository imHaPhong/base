const passport = require('passport');
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Admin = require('../models/admin')
const Shop = require('../models/shop')

require('../ultis/oauth');
exports.getLogin = (req, res) => {
    var cookie = req.cookies.uID;
    if (cookie) {
        res.redirect("/user/setting")
    } else {
        res.render('login', {
            err: false
        })
    }
}

exports.login = async (req, res) => {
    let user = ""
    try {
        if (await User.findOne({
            'email': req.body.email
        })) {
            user = await User.findOne({
                'email': req.body.email
            })
        } else if (await Admin.findOne({
            'email': req.body.email
        })) {
            user = await Admin.findOne({
                'email': req.body.email
            })
        } else if (await Shop.findOne({
            'email': req.body.email
        })) {
            user = await Shop.findOne({
                'email': req.body.email
            })
        }
        if (!user) return res.render("login", {
            err: true
        })
        if (user.password != req.body.password) res.render("login", {
            err: true
        })
        const token = jwt.sign({
            _id: user._id,
            role: user.role
        }, process.env.TOKEN_SECRET)
        res.cookie('uID', token, {
            maxAge: 900000,
            httpOnly: true
        });
        res.header('auth-token', token).redirect("/user/setting")

    } catch (err) {
        console.log(err);
    }
}

exports.loginWithGG = passport.authenticate('google', { scope: ['profile', 'email'] })

exports.googleCb = 
async function(req, res) {
    let user = ""
    try {
        user = await User.findOne({
            'email': req.user.email
        })
        if (!user) return res.render("login", {
            err: true
        })
        const token = jwt.sign({
            _id: user._id,
            role: user.role
        }, process.env.TOKEN_SECRET)
        res.cookie('uID', token, {
            maxAge: 900000,
            httpOnly: true
        });
        res.header('auth-token', token).redirect("/user/setting")

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