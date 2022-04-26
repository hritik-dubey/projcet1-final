const blogSchema = require("../models/blogModel")

let createBlog = async (req, res) => {
    try {
        let data=req.body
        let result= await blogSchema.create(data)
        res.status(201).send({Msg: result})
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}


module.exports = { createBlog, }