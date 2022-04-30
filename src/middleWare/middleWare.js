let jwt =require("jsonwebtoken")
const blogModel = require("../models/blogModel")

let authenticate= async function (req,res,next){
    try{
        let token = req.headers["x-api-key"] 
         if(!token)  return res.status(403).send({status:false,msg:"Authentication failed"})
        let decodedToken = await jwt.verify(token,"functionUp project1Blog") 
        req["decodedAuthorId"]=decodedToken.authorId
        console.log("hello")
        next()
    }
    catch(error)
    {
        return res.status(500).send({status:false,error:error.message})
    } 
}

let authorize =async function(req,res,next){
    try{
        let decodedAuthorId = req.decodedAuthorId
        let blogId = req.params.blogId
        let blog = await blogModel.findOne({ _id: blogId, isDeleted: false })
        if (!blog)
            return res.status(404).send({ status: false, msg: "No blog exits with this Id or the blog is deleted" })
        let authorId = blog.authorId
        console.log(authorId)
        if (decodedAuthorId != authorId) return res.status(403).send({ status: false, msg: "You are not Authorized" })
    }
    catch(error)
    {
        return res.status(500).send({status:false,error:error.message})
    } 
}
module.exports={authenticate, authorize}
