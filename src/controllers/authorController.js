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















// // const newauther = new author({
// //     firstName: req.body.fname,
// //     lastName: req.body.lname,
// //     email: req.body.Email,
// //     password: req.body.password
// // })

// module.exports.createAuthor= createAuthor

// let result = await axios(options);
//         console.log(result)
//         let data = result.data
//         res.status(200).send({ msg: data, status: true })


// router.post("/author", async (req, res) => {
//     try {
//       var newauthor = new author(req.body);
//       await author.save();
//       res.status(200).send(user);
//     } catch (error) {
//       res.status(500).send({Error:error.message});
//     }
//   });

//   module.exports.createAuthor= createAuthor
  
//   module.exports = mongoose.model("author", createauthor);
