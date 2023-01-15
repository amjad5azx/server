const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const courseSchema=new mongoose.Schema({
    stlname:{
        type:String,
        required:true
    },
    stgender:{
        type:String,
        required:true
    },
    stwhatsappNo:{
        type:String,
        required:true,
        unique:true
    },
    stemail:{
        type:String,
        required:true,
        unique:true
    },
    tlname:{
        type:String,
        required:true
    },
    tgender:{
        type:String,
        required:true
    },
    twhatsappNo:{
        type:String,
        required:true,
        unique:true
    },
    temail:{
        type:String,
        required:true,
        unique:true
    },
    zoom:{
        type:String,
        required:true
    }
})

const Courses=new mongoose.model("CourseData",teacherSchema)

module.exports=Courses