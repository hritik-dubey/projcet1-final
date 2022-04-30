const { findOne } = require("../models/authorModel");
const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel")
//######################################################################################################################
let keyValid = function (value) {
    if (typeof (value) == "undefined" || value == null) return true
    if (typeof (value) === "string" && value.trim().length == 0) return true
    return false
}

//######################################################################################################################
const createBlog = async (req, res) => {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false.valueOf, msg: "Please provide something to create blog" })

        const { authorId, title, body, tags, category, subcategory, isPublished } = data

        if (!authorId) return res.status(400).send({ msg: "authorId is required...!" });
        if (keyValid(authorId)) return res.status(400).send({ status: false, msg: "AuthorId should be valid" })
        const validId = await authorModel.findById(authorId)
        if (!validId) return res.status(400).send({ status: false, msg: "AuthorId is invalid" })
        if (!title) return res.status(400).send({ msg: "Title is required...!" });
        if (keyValid(title)) return res.status(400).send({ status: false, msg: "title should be valid" })
        if (!body) return res.status(400).send({ msg: "Body is required...!" });
        if (keyValid(body)) return res.status(400).send({ status: false, msg: "body should be valid" })
        if (tags != undefined)
            if (keyValid(tags)) return res.status(400).send({ status: false, msg: "tags should be valid" })
        if (!category) return res.status(400).send({ msg: "Category is required...!" });
        if (keyValid(category)) return res.status(400).send({ status: false, msg: "category should be valid" })
        if (subcategory != undefined)
            if (keyValid(subcategory)) return res.status(400).send({ status: false, msg: "subcategory should be valid" })

        let repeativeData = await blogModel.find({ body: body })
        console.log(repeativeData)
        if (!repeativeData.length == 0) return res.status(400).send({ status: false, msg: "you are creating repeative blog again with same body" })
        
        let result = await blogModel.create(data) 
        if (isPublished) { result.publishedAt = Date() }
        result.save()
        return res.status(201).send({ msg: result })
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}
//######################################################################################################################
const getblog = async (req, res) => {
    try {
        const data = req.query
        const blogs = {}
        const { authorId, category, tags, subcategory } = data

        if (authorId != undefined) {
            if (keyValid(authorId)) return res.status(400).send({ status: false, msg: "AuthorId is invalid" })
            const validId = await authorModel.findById(authorId)
            if (!validId) return res.status(400).send({ status: false, msg: "Not a valid AuthorId" })
            blogs.authorId = authorId
        }
        if (category != undefined) {
            if (keyValid(category)) return res.status(400).send({ status: false, msg: "Category is invalid" })
            blogs.category = category
        }
        if (tags != undefined) {
            if (keyValid(tags)) return res.status(400).send({ status: false, msg: "tags is invalid" })
            blogs.tags = tags
        }
        if (subcategory != undefined) {
            if (keyValid(subcategory)) return res.status(400).send({ status: false, msg: "Subcategory is invalid" })
            blogs.subcategory = subcategory
        }
        blogs.isDeleted = false
        blogs.isPublished = true
        let result = await blogModel.find(blogs).count()
        console.log(blogs)
        if (result.length == 0) return res.status(404).send({ status: false, msg: "No blog found" })
        return res.status(200).send({ msg: result })

    }
    catch (err) {
        res.status(500).send({ Error: err.message })
    }
}
//######################################################################################################################

let updateBlog = async (req, res) => {
    try {

        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Please provide something to update" })
        let { title, body, category, subcategory, tags } = data
        if (title != undefined) {
            title = title.trim()
            if (keyValid(title)) return res.status(400).send({ status: false, msg: "title should be valid" })
        }
        if (body != undefined) {
            body = body.trim()
            if (keyValid(body)) return res.status(400).send({ status: false, msg: "body should be valid" })
        }
        if (tags != undefined) {
            tags = tags.map(el => el.trim())
            if (keyValid(tags)) return res.status(400).send({ status: false, msg: "tags should be valid" })
        }
        if (category != undefined) {
            category = category.trim()
            if (keyValid(category)) return res.status(400).send({ status: false, msg: "category should be valid" })
        }
        if (subcategory != undefined) {
            subcategory = subcategory.map(el => el.trim())
            if (keyValid(subcategory)) return res.status(400).send({ status: false, msg: "subcategory should be valid" })
        }
        let updatedBlog = await blogModel.findByIdAndUpdate({ _id: blogId }, { $set: { title: title, body: body, category: category }, $addToSet: { subcategory: subcategory, tags: tags } }, { new: true })

        updatedBlog.isPublished = true
        updatedBlog.publishedAt = Date()
        updatedBlog.save()
        res.status(200).send({ status: true, data: updatedBlog })
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}
//######################################################################################################################
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
//######################################################################################################################
const deleteBlogs = async (req, res) => {
    try {
        let data = req.query;
        if (data.isPublished == undefined) return res.send({ status: false, msg: "Please Provide ispublised field" })
        console.log(data.isPublished)
        if (data.isPublished == "true") return res.status(403).send({ status: false, msg: "You Cant Delete Published blogs" })
        let Blog = await blogModel.find(data)
        if (Blog.length == 0) return res.status(404).send({ status: false, msg: "No Blog found with Given Details" })
        Blog[0].isDeleted = true
        Blog[0].save()
        res.status(200).send({ status: true, msg: Blog })
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

//######################################################################################################################
module.exports = { createBlog, getblog, deleteBlogs, updateBlog, deleteBlog }



