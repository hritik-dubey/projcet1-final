const authorSchema = require("../models/authorModel")

let createAuthor = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).send({ Error: err.message })
    }
}

module.exports = { createAuthor, }