const mongoose = require('mongoose');
const blogschema = new mongoose.Schema({
        title:{
            type: String,
            required:true
        },
        body :{
            type: String,
            required:true
        },
        tags: [{
            type: String
        }],
        category: String,
        subcategory: [{
            type: String
        }],
        published: Boolean,
        publishedAt: Date, 
        deleted: Boolean,
        deletedAt:Date, 
      
},{timestamps:true});
module.exports = mongoose.model("blog" ,blogschema)