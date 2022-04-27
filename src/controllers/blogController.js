const blogModel = require("../models/blogModel")

const createBlog = async (req, res) => {
    try {
        const data = req.body
        if (!data.title||!data.body||!data.category)  return res.status(400).send({error:"title ,body ,category are mandantory"})
            const result = await blogModel.create(data)
            return res.status(201).send({ msg: result })
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

// const updateBlog= async (req,res)=>{
//     try{

//         const id =req.params.blogId
//         const data =req.body
//         const updated = await blogModel.findByIdAndUpdate(id ,  data , { new: true })
//         res.send({msg:updated})
//         console.log(updated)

//     }
//     catch (error) {
//         res.status(500).send({ status: false, error: error.message })
//     }
}

module.exports.createBlog = createBlog
module.exports.updateBlog=updateBlog


