const express=require("express");
const connectDB=require("./config/bd")
const dotenv=require("dotenv").config();
const cors=require("cors")
const authRoutes=require("./Routes/AutRouteurs")
const cookiesParser=require("cookie-parser")
connectDB();
const app=express();
app.listen(4000,()=>{
    console.log("Server started on port 4000")
})
app.use(cors({
    origin:["http://localhost:3000"],
    method:["GET","POST"],
    credentials:true,
}));

//boyparser middleware
app.use(express.json())
app.use(cookiesParser())
//routes
app.use("/",authRoutes)
