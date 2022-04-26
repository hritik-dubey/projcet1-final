const blogSchema = require("../models/blogModel")

let createBlog = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}


module.exports = { createBlog, }