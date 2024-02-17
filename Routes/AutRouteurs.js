const express=require("express");
const router=require("express").Router();
const { signupUser, loginUser,createAccount, changePassword, userProfile}=require("../Controllers/AuthControllers");
const { isAdmin } = require("../Middlewares/VerifyRole");
const { authenticateToken } = require("../Middlewares/verifyToken");
const { verifyTokenAndRole } = require("../Middlewares/authMiddleware");
const { ajout, foundId, trouver, update } = require("../Controllers/Annonce");
router.post("/signup",signupUser)
router.post("/login",loginUser)
router.post("/verification",createAccount)
router.post("/reset",changePassword)
router.post("/ajout",verifyTokenAndRole, ajout);
router.get("/trouver/:id",foundId)
router.get("/take",trouver)
router.put("/update/:id",update)
router.get('/users',verifyTokenAndRole,isAdmin);
module.exports=router