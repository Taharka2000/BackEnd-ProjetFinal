const { verify } = require("jsonwebtoken");
const { signupUser, loginUser}=require("../Controllers/AuthControllers");
const router=require("express").Router();
router.post("/signup",signupUser)
router.post("/login",loginUser)

module.exports=router