const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "0,0"
    }, 
    email: {
        type: String,
        required: true
    },
    statuses: {
        type: String,
        default: "not active"
    },
    password: {
        type: String,
        required: true
    },
    menu: [
        {
            name: {
                type: String,
                required: true
            }, 
            img: {
                type: String,
                required: true
            }, 
            price: {
                type: Number,
                required: true
            }
        }
    ],
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'shop'
    },
    revenue: {
        type: Number,
        default:0
    },
    timeOpen: {
        type: Number,
        default:0
    },
    rate: {
        userRate:[
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Users"
            }
        ],
        avgRate: {
            type: Number,
            default:0
        }
    }

})

module.exports = mongoose.model("Shop", shopSchema)