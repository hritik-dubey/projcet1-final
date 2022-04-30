const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel")

//###################################################################################################
/*### GET /blogs
- Returns all blogs in the collection that aren't deleted and are published
- Return the HTTP status 200 if any documents are found. The response structure should be like [this](#successful-response-structure) 
- If no documents are found then return an HTTP status 404 with a response like [this](#error-response-structure) 
- Filter blogs list by applying filters. Query param can have any combination of below filters.
  - By author Id- By category- List of blogs that have a specific tag- List of blogs that have a specific subcategory
example of a query url: blogs?filtername=filtervalue&f2=fv2*/
const getblog = async (req, res) => {
    try {
        const data =req.query
        const {authorId,category,tags,subcategory}=data
        const validId = await authorModel.findById(authorId)
        if(!validId) return res.status(400).send({status:false,msg:"AuthorId is invalid"})
        let result = await blogModel.find({ $or: [{ $or: [{ authorId: authorId }, { category: category }, { tags: tags }, { subcategory: subcategory }] }, { isPublished: true, isDeleted: false }] })
        if(!result) return res.status(404).send({status:false,msg:"No blog found"})
        return res.status(200).send({ msg: result.length })
    }
    catch (err) {
        res.status(500).send({ Error: err.message })
    }
}
// let keyValid = function (value) {
//     if (typeof (value) == "undefined" || value == null) return false
//     if (typeof (value) === "string" && value.trim().length == 0) return false    //  string 
//     return true

//########################################################################################################################
const createBlog = async (req, res) => {
    try {
        let data = req.body
        let isPublished = req.body.isPublished
        console.log(req.body.isPublished);
        let isDeleted = req.body.isDeleted

        const validId = await authorModel.findById({ _id: data.authorId })
        if (!validId) return res.status(400).send({ status: false, msg: "AuthorId is not valid" })

        if (!data.title || !data.body || !data.category || !data.authorId) return res.status(400).send({ error: "title ,body ,category,Authorid are mandantory and cant be empty" })
        let repetiveData = await blogModel.find(data)
        if (!repetiveData.length == 0) return res.status(400).send({ status: false, msg: "you are creating repeative blog again" })

        let result = await blogModel.create(data)
        if (isPublished) { result.publishedAt = Date() }
        if (isDeleted) { result.deletedAt = Date() }
        result.save()
        return res.status(201).send({ msg: result })
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}


//################################################################################################################
let keyValid = function (value) {
    if (typeof (value) == "undefined" || value == null) return false
    if (typeof (value) === "string" && value.trim().length == 0) return false    
    return true
}

let updateBlog = async (req, res) => {
    try {
        let blogId = req.params.blogId
        let blog = await blogModel.findOne({ _id: blogId }, { isDeleted: false })
        if (!blog)
            return res.status(404).send({ status: false, msg: "No blog exits with this Id or the blog is deleted" })
       let data = req.body
         const { title, body, category, subcategory, tags } = data
        if (title.length>=0)
            if (!keyValid(title)) return res.status(400).send({ status: false, msg: "title should be valid" })
        if (body.length>=0)
            if (!keyValid(body)) return res.status(400).send({ status: false, msg: "body should be valid" })
        if (tags.length>=0)
            if (!keyValid(tags)) return res.status(400).send({ status: false, msg: "tags should be valid" })
        if (category.length>=0)
            if (!keyValid(category)) return res.status(400).send({ status: false, msg: "category should be valid" })
        if (subcategory.length>=0)
            if (!keyValid(subcategory)) return res.status(400).send({ status: false, msg: "subcategory should be valid" })

        let updatedBlog = await blogModel.findByIdAndUpdate({ _id: blogId }, { $set: { title: title.trim(), body: body.trim(), category: category.trim() }, $addToSet: { subcategory: subcategory, tags: tags } }, { new: true })// welcome

        updatedBlog.isPublished = true
        updatedBlog.publishedAt = Date()
        updatedBlog.save()
        res.status(200).send({ status: true, data: updatedBlog })
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}
//################################################################################################################
//### DELETE /blogs/:blogId
//- Check if the blogId exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 without any response body.
//- If the blog document doesn't exist then return an HTTP status of 404 with a body like [this](#error-response-structure)
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

//################################################################################################################
//### DELETE /blogs?queryParams
//- Delete blog documents by category, authorid, tag name, subcategory name, unpublished
//- If the blog document doesn't exist then return an HTTP status of 404 with a body like [this](#error-response-structure)
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
