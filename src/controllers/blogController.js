const authorModel = require("../models/authorModel");
//const { findById } = require("../models/blogModel");
const blogModel = require("../models/blogModel")


let getblog = async (req, res) => {
    try {
        let authorid = req.query.authorId;
        let mycategory = req.query.category;
       let mytags = req.query.tags;
       let mysubcategory = req.query.subcategory;
        if (authorid || mycategory || mytags||mysubcategory) {
           
            let data = await authorModel.find({ _id: authorid })
         
            if (data.length == 0) {
                return res.status(400).send({ msg: "give valid authorid" })
            }
           
            let result = await blogModel.find({$and:[{$or:[{ authorId: authorid},{category:mycategory},{tags:mytags},{subcategory:mysubcategory}]},{ isPublished: true,isDeleted: false }]})
            return res.status(200).send({ msg: result })

        }
         let mainresult = await blogModel.find({ isPublished: true, isDeleted: false });
        return res.status(200).send({ msg: mainresult })

    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
    // try {
    //     let data = req.query;
    //         let resultdata = await blogModel.find({$and:[{data},{isPublished:true,isDeleted:false}]});
    //         return res.status(200).send({ masg: resultdata  })
    //    }
    //     catch (error) {
    //         res.status(500).send({ status: false, error: error.message })
    //     }
    // }

    // //         let data = req.body
    // //         let result = await blogModel.create(data)
    // //         res.status(201).send({ msg: result })
    // //     } catch (err) {
    // //         res.status(500).send({ Error: err.message })
    // //     }
    // //
}

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


// // // module.exports.getblog = getblog;
// // // module.exports.postblog = postblog;
//module.exports = { createBlog ,getblog}// updateBlog, deleteBlog }
module.exports.createBlog = createBlog;
module.exports.getblog = getblog;

