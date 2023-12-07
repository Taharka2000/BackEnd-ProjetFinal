const { verify } = require("jsonwebtoken");
const { signupUser, loginUser, sendmail}=require("../Controllers/AuthControllers");
const router=require("express").Router();
const{verifyTokenAndRole}=require("../Middlewares/authMiddleware")
router.post("/signup",signupUser)
router.post("/login",loginUser)
router.post("/verification",sendmail)
router.get('/users',verifyTokenAndRole)

module.exports=router