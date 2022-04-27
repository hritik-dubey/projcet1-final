const mongoose = require('mongoose');
const validator= require("validator")

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
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"],
    },
    email: {
        type: String,    
        required: true,    
        trim:true,    
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        requird: true,
        minlength: 6,
        select: false,
    },
},{ timestamps: true })

module.exports = mongoose.model('author', authormodel);
