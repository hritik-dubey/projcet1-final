const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel")

//###################################################################################################


let getblog = async (req, res) => {    
    try {
        let authorid = req.query.authorId;
        let mycategory = req.query.category;
        let mytags = req.query.tags;
        let mysubcategory = req.query.subcategory;
        if (authorid || mycategory || mytags || mysubcategory) {
            let data = await authorModel.find({ _id: authorid })
            if (data.length == 0) {
                return res.status(400).send({ msg: "give valid authorid" })
            }
            let result = await blogModel.find({ $and: [{ $or: [{ authorId: authorid }, { category: mycategory }, { tags: mytags }, { subcategory: mysubcategory }] }, { isPublished: true, isDeleted: false }] })
            return res.status(200).send({ msg: result })
        }
        let mainresult = await blogModel.find({ isPublished: true, isDeleted: false });
        return res.status(200).send({ msg: mainresult })
    }
    catch (err) {
        res.status(500).send({ Error: err.message })
    }
}
//########################################################################################################################
    const createBlog = async (req, res) => {   
        try {
            const data = req.body
            const isPublished = req.body.isPublished
            const isDeleted = req.body.isDeleted
            if (!data.title || !data.body || !data.category || !data.authorId) return res.status(400).send({ error: "title ,body ,category are mandantory" })
            const result = await blogModel.create(data)
            if (isPublished) result.publishedAt = Date()
            if (isDeleted) result.deletedAt = Date()
            result.save()
            return res.status(201).send({ msg: result })
        }
        catch (error) {
            res.status(500).send({ status: false, error: error.message })
        }
    }

//################################################################################################################

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

//################################################################################################################
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
        const data = req.query;
        if(data.isPublished==undefined)  return res.send({status:false,msg:"Please Provide ispublised in body"})
        console.log(data.isPublished)
        // if (!author) return res.status(400).send({ status: false, msg: "please enter valid Author id" })
        if (data.isPublished == "true") return res.status(403).send({ status: false, msg: "You Cant Delete Published blogs" })
        const Blog = await blogModel.find(data)
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
module.exports = { createBlog, getblog, deleteBlogs,updateBlog,deleteBlog }
