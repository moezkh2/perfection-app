const mongoose = require('mongoose')
const ServiceSchema= new mongoose.Schema({
    Category: {type:String,required:true},
    Price: {type:String,required:false},
    ClientId: {type:Object,required:true},
    TechnicientId: {type:Object,required:true},
    description:{type:String,required:true},
    date :{type:String,required:false},
    //ps:{type:array,required:false}
    Status: {type:String,required:false,default:"waiting"},
    Rating: {type:Number,required:false},
    UserScoreGained: {type:Number,required:false},
    TechnicienRating: {type:Number,required:false},
    TechnicienScoreGained: {type:Number,required:false},
    UserComment: {type:String,required:false},
    TechnicienComment: {type:String,required:false},
    chat:{type:Array,required:false,default:[] }
})
module.exports= mongoose.model('Service',ServiceSchema)