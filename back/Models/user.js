const mongoose = require('mongoose')
const userSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:false},
    address:{type:String,required:false},
    PassWord: {type:String,required:true},
    NbrOfTasks: {type:Number,required:false},
    Speciality: {type:String,required:false},
    Role: {type:String,required:true},
    Level: {type:Number,required:false}
})
module.exports= mongoose.model('user',userSchema)