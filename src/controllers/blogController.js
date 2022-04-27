const blogSchema = require("../models/blogModel")

let getblog = async (req, res) => {
    try {
        let tittle = req.query.title;
        let givencategory = req.query.category;
        // let giventags = req.query.tags;
        // let data = await blogSchema.find(({ deleted: "true", published: "true" }));
         res.status(201).send({ masg: data })
          if (req.query) {
            let resultdata = await blogSchema.find({ $or: [{ title: tittle }, { category: givencategory }, { tags: giventags }] });
            return res.status(200).send({ masg: resultdata })
        }
      
            
        
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}
let postblog = async (req, res) => {
    try {
        let data = req.body;
        let savedata = await blogSchema.create(data)
        res.status(200).send({ masg: savedata })
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}


module.exports.getblog = getblog;
module.exports.postblog = postblog;