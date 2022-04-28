const authorModel = require("../models/authorModel")

let createAuthor = async (req, res) => {
    try {
        data = req.body
        const { fname, lname, title, email, password } = data

        if (!keyValid(fname)) return res.status(400).send({ status: false, msg: "fnamme should be valid" })
        if (!keyValid(lname)) return res.status(400).send({ status: false, msg: "lname should be valid" })
        if (!keyValid(title)) return res.status(400).send({ status: false, msg: "title should be valid" })
        if (!keyValid(email)) return res.status(400).send({ status: false, msg: "email should be valid" })
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return res.status(400).send({ status: false, msg: "Invalid email format" })
        if (!keyValid(password)) return res.status(400).send({ status: false, msg: "password should be valid" })

        let validEmail = await authorModel.findOne({ email: email }) 
        console.log(validEmail)
        if (validEmail) return res.status(400).send({ status: false, msg: "Email already exist" })

        let createdAuthor = await authorModel.create(data)
        return res.status(201).send({ status: true, msg: createdAuthor })

    }
    catch (err) {
        res.status(500).send({ Error: err.message })
    }
}

let keyValid = function (value) {
    if (typeof (value) == "undefined" || value == null) return false
    if (typeof (value) === "string" && value.trim().length == 0) return false    //  string 
    return true
}

module.exports.createAuthor = createAuthor
