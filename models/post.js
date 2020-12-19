const mongoose = require('mongoose')
const { schema } = require('./user')
const Schema = mongoose.Schema

const postSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    header: {
        type: String,
        required: true
    }, 
    body: {
        type: String,
        required: true
    }, 
    comment: [{
        userID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "users"
        }, 
        content: {
            type: String,
            required: true
        }, time: {
            type: Date,
            default: Date.now()
        }
    }]
    , 
    react: {
        like: [{
            type: Schema.Types.ObjectId
        }]
    }
})

module.exports = mongoose.model('Post', postSchema)