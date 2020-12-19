const User = require('../models/user')
const Post = require('../models/post')

exports.addPost = async (req, res) => {
    req.body = { ...req.body, userID: req.token._id }
    try {
        const post = await new Post(req.body).save()
        res.send(post)
    } catch (err) {
        console.log(err);
    }
}

exports.getAllPost = async (req, res) => {
    const listPost = await Post.find({ userID: req.token._id })
    res.send(listPost)
}

exports.userComment = async (req, res) => {
    req.body = { userID: req.token._id, ...req.body }
    const post = await Post.findById(req.params.postID)
    post.comment = post.comment.concat(req.body)
    await post.save()
    res.send(post)
}

exports.userReatc = async (req, res) => {
    let hasReact = false
    const post = await Post.findById(req.params.postID)
    post.react.like.forEach(userID => {
        if (userID == req.token._id) {
            hasReact = true
        } 
    });
    console.log(hasReact);
    if(hasReact) {
        post.react.like.splice(post.react.like.indexOf(req.token._id), 1)
    } else{
        post.react.like = post.react.like.concat(req.token._id)
    }
    await post.save()
    res.send(post.react.like)
}

exports.userSave = async (req, res) => {
    s
}