const express = require('express');
const router = express.Router();

const blogController = require("../controllers/blogController")
const authorController = require("../controllers/authorController")
const middleWare =require("../middleWare/middleWare")

router.post('/createAuthor',authorController.createAuthor) 

router.post("/createBlog" ,middleWare.authenticate,blogController.createBlog)      

router.get("/getBlog",middleWare.authenticate,blogController.getblog)

router.put('/blogs/:blogId',middleWare.authenticate, middleWare.authorize ,blogController.updateBlog)

router.delete('/blogs/:blogId',middleWare.authenticate, middleWare.authorize,blogController.deleteBlog)   // path params

router.delete("/deleteBlogs",middleWare.authenticate,middleWare.authorize,blogController.deleteBlogs)    //query params

router.post("/loginAuthor",authorController.loginAuthor)


module.exports = router; 