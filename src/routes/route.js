const express = require('express');
const router = express.Router();

const blogcontrollers = require("../controllers/blogController")



router.get("/getblog",blogcontrollers.getblog);
router.post("/postblog",blogcontrollers.postblog);






module.exports = router;