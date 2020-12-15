const User = require('../models/user')
const Post = require('../models/post')

exports.addPost = async (req, res) => {
    req.body= {...req.body,userID: req.token._id}
    try{
        const post = await new Post(req.body).save()
        res.send(post)
    } catch(err) {
        console.log(err);
    }
}

exports.getAllPost = async (req, res) => {
    const listPost = await Post.find({userID: req.token._id})
    res.send(listPost)
}