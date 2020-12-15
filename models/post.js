const mongoose = require('mongoose')
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
    }
})

module.exports = mongoose.model('Post', postSchema)