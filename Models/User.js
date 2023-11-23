//creation d'un model user  avec mongoose
const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const validator=require("validator")
const Schema=mongoose.Schema
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:
    {
        type: String,
        required: true, 
    },
 role:{
    type:String,
 }
})
//method to compare the hashed password with inputted one
userSchema.statics.signup=async function(email,password,name,role){
    //validation
    if(!email||!password||!name||!role){
        throw Error('all fields are required')
    }
    if(!validator.isEmail(email)){
        throw Error ('invalid email address')
    }
    if(!validator.isStrongPassword(password)){
        throw Error ("please enter a strong password")
    }
    const exists=await this.findOne({email});
   if(exists){
    throw Error("Email already existe")
   }
   const salt =await bcrypt.genSalt(10)
   const hash=await bcrypt.hash(password,salt)
   const user=await this.create({email,password:hash,name,role})
   return user
};
//method for login
userSchema.statics.login=async function (email,password){
    if(!email||!password){
        throw Error('all fields are required')
    }
    const user= await this.findOne({email})
    if (!user){
        throw Error('User not found');
        };
        const isValid=await bcrypt.compare(password,user.password)
        if (!isValid){
            throw Error('Invalid Password')
            }
            return user;
}
module.exports = mongoose.model("User", userSchema)
