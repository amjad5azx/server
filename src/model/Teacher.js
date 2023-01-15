const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const teacherSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    whatsappNo:{
        type:String,
        required:true,
        unique:true
    },
    phoneNo:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    secret:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    zoom:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String
        }
    }
    ]
})

teacherSchema.methods.generateAuthToken=async function(){
    try {
        console.log(this._id);
        const token=jwt.sign({_id:this._id.toString()},"process.env.SECRET_KEY")
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        console.log(this._id);
        return token
    } catch (e) {
        // res.send("the error: "+e)
        console.log("the error: "+e)
    }
}

teacherSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,12)
        console.log(`the password is ${this.password}`);
    }
    next()
})

const TeacherRegister=new mongoose.model("TeacherData",teacherSchema)

module.exports=TeacherRegister
