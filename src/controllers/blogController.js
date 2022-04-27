const blogModel = require("../models/blogModel")

let getblog = async (req, res) => {
    try {
        let tittle = req.query.title;
        let givencategory = req.query.category;
        let giventags = req.query.tags;
        let data = await blogSchema.find(({ deleted: "true", published: "true" }));
        if (req.query) {
            let resultdata = await blogModel.find({ $or: [{ title: tittle }, { category: givencategory }, { tags: giventags }] });
            return res.status(200).send({ masg: resultdata })
        }
        else {
         let data = await blogModel.find(({ deleted: "true", published: "true" }));
        let result = await blogModel.create(data)
        res.status(201).send({ msg: result })
    

    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
} 

// let updateBlog = async (req, res) => {
//     try {
//         let bId = req.params.blogId
//         let blog = await blogModel.findOne({ _id: bId }, { isDeleted: false })
//         if (!blog)
//             return res.status(404).send({ status: false, msg: "No blog exits with this Id or the blog is deleted" })
//         let data = req.body
//         let updatedBlog = await blogModel.findByIdAndUpdate({ _id: bId }, { $set: data }, { new: true })
//         updatedBlog.isPublished = true
//         updatedBlog.publishedAt = Date()
//         updatedBlog.save()
//         res.status(200).send({ status: true, data: updatedBlog })
//     } catch (err) {
//         res.status(500).send({ Error: err.message })
//     }
// }
// let postblog = async (req, res) => {
//     try {
//         let data = req.body;
//         let savedata = await blogSchema.create(data)
//         res.status(200).send({ masg: savedata })

// let deleteBlog = async (req, res) => {
//     try {
//         let bId = req.params.blogId
//         let blog = await blogModel.findOne({ _id: bId }, { isDeleted: false })
//         if (!blog)
//             return res.status(404).send({ status: false, msg: "No blog exits with this Id or the blog is deleted" })
//         let deletedBlog = await blogModel.findByIdAndUpdate({ _id: bId }, { $set: { isDeleted: true } }, { new: true })
//         deletedBlog.deletedAt = Date()
//         deletedBlog.save()
//         res.status(200).send({ status: true, data: deletedBlog })
//     } catch (err) {
//         res.status(500).send({ Error: err.message })
//     }
// }


module.exports.getblog = getblog;
//module.exports.postblog = postblog;