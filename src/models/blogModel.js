const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId

const blogerSchema = new mongoose.Schema({
    title: {
        type: 'string',
        required: true,
    },
    boby: {
        type: 'string',
        required: true,
    },
    authorId: {
        type: ObjectId,
        ref:"author",
        required: true,
    },
    
    
    tags: [{
        type: String,
    }],
    category: {
        type: String,
        required: true,
       

    },
    subcategory: {
        type: [String],
        
        
    },

   
},
    {
        isDeleted: {
            type: Boolean,

            default: false,
        },
    },
    {
        ispublished: {
            type: Boolean,
            default: false,
        },
    },

    {
        timestamps:
        { createdAt: true, updatedAt: false },
    }
    // {
    //     createdAt: {
    //         type: string,
    //     },
    // },
    // {
    //     updateat: {
    //         type: string
    //     },
    // }
      




)



module.exports = mongoose.model('bloger',blogerSchema);




