const authorModel =require("../models/authorModel")
         
let createAuthor = async (req, res) => {
    try {
        data=req.body
        let result= await authorModel.create(data)
        res.status(201).send({Msg: result})
    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}
module.exports.createAuthor= createAuthor




