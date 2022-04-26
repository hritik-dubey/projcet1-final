const blogModel = require("../models/blogModel")

let createBlog = async (req, res) => {
    try {
        let data = req.body
        let result = await blogModel.create(data)
        res.status(201).send({ msg: result })
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
} 

let updateBlog = async (req, res) => {
    try {
        let bId = req.params.blogId
        let blog = await blogModel.findOne({ _id: bId }, { isDeleted: false })
        if (!blog)
            return res.status(404).send({ status: false, msg: "No blog exits with this Id or the blog is deleted" })
        let data = req.body
        let updatedBlog = await blogModel.findByIdAndUpdate({ _id: bId }, { $set: data }, { new: true })
        updatedBlog.isPublished = true
        updatedBlog.publishedAt = Date()
        updatedBlog.save()
        res.status(200).send({ status: true, data: updatedBlog })
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}

let deleteBlog = async (req, res) => {
    try {
        let bId = req.params.blogId
        let blog = await blogModel.findOne({ _id: bId }, { isDeleted: false })
        if (!blog)
            return res.status(404).send({ status: false, msg: "No blog exits with this Id or the blog is deleted" })
        let deletedBlog = await blogModel.findByIdAndUpdate({ _id: bId }, { $set: { isDeleted: true } }, { new: true })
        deletedBlog.deletedAt = Date()
        deletedBlog.save()
        res.status(200).send({ status: true, data: deletedBlog })
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}


module.exports = { createBlog, updateBlog, deleteBlog }