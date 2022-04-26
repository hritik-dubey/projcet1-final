const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogController = require('../controllers/blogController')


router.post("/createAuthor", authorController.createAuthor )

router.post('/createBlog', blogController.createBlog)

router.put('/blogs:/blogId', blogController.createBlog)

router.delete('/blogs:/blogId', blogController.deleteBlog)


module.exports = router; 