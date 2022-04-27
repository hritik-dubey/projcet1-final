// email:{
//     type: String,
//     required: true,
//     unique: true,

// }

const mongoose = require('mongoose');
const validator = require('validator')

const authormodel = new mongoose.Schema({


    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    title: {
        type:String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        },
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            //enter a valid email id must contain @^&*%12
        ]


    },
    password: {
        type: String,
        requird: true,
        minlength: 6,
        select: false,
    },

},

    { timestamps: true },
)

module.exports = mongoose.model('author', authormodel);
