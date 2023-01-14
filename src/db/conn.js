const mongoose=require("mongoose")
const DB="mongodb://localhost:27017/Al-Hadi"

mongoose.set('strictQuery',true)
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex :true,
    // userFindAndModify:false
}).then(()=>{
    console.log("Connection Successful")
}).catch((e)=>{
    console.log("no connection")
})