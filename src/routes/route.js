const express = require('express');
const router = express.Router();

const blogController = require("../controllers/blogController")
const authorController = require("../controllers/authorController")
const middleWare =require("../middleWare/middleWare")

router.post('/createAuthor',authorController.createAuthor) 

router.post("/createBlog" ,middleWare.authenticate,blogController.createBlog)    //done     

router.get("/getBlog",middleWare.authenticate,middleWare.authorizeGet,blogController.getblog)   //done 

router.put('/blogs/:blogId' ,middleWare.authenticate, middleWare.authorize,blogController.updateBlog)   //done

router.delete('/blogs/:blogId',middleWare.authenticate, middleWare.authorize,blogController.deleteBlog)   //done

router.delete("/deleteBlogs",middleWare.authenticate, middleWare.authorizeGet,blogController.deleteBlogs)   //done

router.post("/loginAuthor",authorController.loginAuthor)   //done


module.exports = router; 