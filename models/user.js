const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: String
    },
    description: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String 
    },
    city:{
        type: String,
        default: 'Ha Noi'
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'User'
    }, 
    address: {
        type: String,
        required: true
    },
    point: {
        type: Number,
        default: 0
    },
    avtar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9WkgRWNucAK3km740j2_YJb4mfvZuZk2vPg&usqp=CAU"
    },

})

module.exports = mongoose.model('User', userSchema)