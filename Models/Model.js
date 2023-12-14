//creation d'un model user  avec mongoose
const mongoose = require("mongoose");
const Schema=mongoose.Schema
const useModel = new Schema({
    name:{
        type:String,
        
    },
    email: {
        type: String,
       
    },
    date:{
        type : String ,
    },
    heure:{
        type : String
    }
})
module.exports = mongoose.model("Model", useModel)