//<<<<<<< HEAD
//let createBlog = async (req,res)=>{
    
//}
//=======
const blogSchema = require("../models/blogModel")

let createBlog = async (req, res) => {
    try {
            console.log(hjhkj)
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}


module.exports = { createBlog, }
//>>>>>>> c1b29db0f2b20819b40b81f6938a370f22162cf1
