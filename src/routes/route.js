const express = require('express');
const router = express.Router();

const blogController = require("../controllers/blogController")
//const authorController = require("../controllers/authorController")

//router.post('/createAuthor',authorController.createAuthor)  
router.post("/createBlog",blogController.createBlog)
router.get("/getBlog",blogController.getblog)
// router.put('/blogs:/blogId', blogController.createBlog)
// router.delete('/blogs:/blogId', blogController.deleteBlog)


module.exports = router; 